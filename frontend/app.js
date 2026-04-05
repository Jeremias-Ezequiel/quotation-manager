import { LOCAL_API_URL } from "./const.js";
import {
  renderProductList,
  renderPriceUsdToArs,
  showModal,
  renderQuoteList,
} from "./renders.js";
import { fetchData } from "./utils/api.js";

const filters = {
  category: "",
  sortBy: "",
  search: "",
};

let priceUsd;

let productsList = JSON.parse(localStorage.getItem("quotation-list")) ?? [];

// This variable is important because it stores the timer id to clear it on every input value, preventing multiples requests in the search by name
let timeout;

document.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();

  const products = await fetchData(`${LOCAL_API_URL}/api/products`);
  const exchangePrice = await fetchData(
    `${LOCAL_API_URL}/api/exchange-rates/official`,
  );

  priceUsd = exchangePrice;

  renderPriceUsdToArs(exchangePrice.data, "today_price_ars");
  renderProductList(products, "products_container", exchangePrice);
  renderQuoteList(productsList);
});

document.querySelectorAll("#categories-filter li").forEach((li) => {
  li.addEventListener("click", () => {
    const category = li.dataset.category;
    filters.search = "";
    filters.category = category;
    updateProducts();
  });
});

document.querySelectorAll("#orderby-filter li").forEach((li) => {
  li.addEventListener("click", () => {
    const order = li.dataset.order;
    filters.search = "";
    filters.sortBy = order;
    updateProducts();
  });
});

document.getElementById("search-filter").addEventListener("input", (e) => {
  // We need apply debouncing because the input will send a request for each input value
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    filters.search = e.target.value.trim();
    filters.category = "";
    filters.sortBy = "";

    updateProducts();
  }, 500);
});

document
  .getElementById("products_container")
  .addEventListener("click", async (e) => {
    // Recorrer el elemento y sus padres hasta que encuentre un nodo que coincida con el css selector
    const showDetailsBtm = e.target.closest(".btn-show-details");
    const addQuoteBtm = e.target.closest(".btn-add-quote");

    if (!showDetailsBtm && !addQuoteBtm) {
      return;
    }

    const sku = showDetailsBtm
      ? showDetailsBtm.dataset.sku
      : addQuoteBtm.dataset.sku;
    let product;

    try {
      product = await fetchData(`${LOCAL_API_URL}/api/products/${sku}`);
      product.data.priceArs = priceUsd.data;
    } catch (err) {}

    if (e.target.classList.contains("btn-show-details")) {
      showModal(product);
    }

    if (e.target.classList.contains("btn-add-quote")) {
      productsList.push(product.data);
      localStorage.setItem("quotation-list", JSON.stringify(productsList));
      renderQuoteList(productsList);
    }
  });

document
  .getElementById("quotation-list")
  .addEventListener("click", async (e) => {
    const btnDelClicked = e.target.closest(".btn-del-quote-list");
    const delItemQuote = e.target.closest(".del-item-quote");
    const btnCreatePdf = e.target.closest(".btn-create-pdf");

    if (!btnDelClicked && !delItemQuote && !btnCreatePdf) {
      return;
    }

    if (btnDelClicked) {
      clearQuotationList();
      clearContainerById("quotation-list");
    }

    if (delItemQuote) {
      const sku = delItemQuote.dataset.sku;
      deleteProductInQuotationList(sku);
    }

    if (btnCreatePdf) {
      const companyName = document.getElementById("company-name").value;
      const cuit = document.getElementById("cuit").value;
      const ivaCondition = document.getElementById("iva-condition").value;
      const subtotalArs = document.getElementById("subtotal-ars").textContent;
      const taxesIva = document.getElementById("taxes-iva").textContent;
      const totalFinalARS = document.getElementById("total-final").textContent;

      if (!companyName || !cuit || !ivaCondition) {
        alert(
          "Company name, cuit or IVA condition are missing. Complete these inputs and try again.",
        );
        return;
      }

      const data = {
        companyName,
        cuit,
        ivaCondition,
        subtotalArs,
        taxesIva,
        totalFinalARS,
      };

      await createProductPDF(data);
    }
  });

async function updateProducts() {
  const queryParams = new URLSearchParams({
    category: filters.category,
    sort: filters.sortBy,
    search: filters.search,
  }).toString();

  try {
    const products = await fetchData(
      `${LOCAL_API_URL}/api/products?${queryParams}`,
    );
    renderProductList(products, "products_container", priceUsd);
  } catch (err) {
    // const container = document.getElementById("products_container");
    // container.innerHTML =
    // ("<p class='bg-danger fw-bold fs-2'>There are not products with these name</p>");
  }
}

function clearQuotationList() {
  productsList = [];
  localStorage.clear();
  updateProducts(productsList);
}

function clearContainerById(id) {
  const container = document.getElementById(id);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function deleteProductInQuotationList(sku) {
  const newProductsList = productsList.filter((p) => p.sku !== sku);
  productsList = newProductsList;
  if (productsList.length) {
    renderQuoteList(productsList);
  } else {
    clearContainerById("quotation-list");
  }
}

async function createProductPDF(data) {
  const payload = {
    clientName: data.companyName,
    cuit: data.cuit,
    products: productsList,
    ivaCondition: data.ivaCondition,
    subTotalArs: data.subtotalArs,
    taxesIva: data.taxesIva,
    totalFinal: data.totalFinalARS,
  };

  try {
    const response = await fetch(`${LOCAL_API_URL}/api/generate-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json();
      alert(errData.message);
      return;
    }

    // Cada pedacito de archivo que llega del backend se ensamblan en una caja
    const blob = await response.blob();

    const fileUrl = window.URL.createObjectURL(blob); // creamos una URL temporal
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `Quotation-${payload.clientName}-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(fileUrl);
  } catch (err) {
    alert("Error creating the PDF:", err.message);
  }
}
