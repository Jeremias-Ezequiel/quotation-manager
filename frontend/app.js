import { LOCAL_API_URL } from "./const.js";
import {
  renderProductList,
  renderPriceUsdToArs,
  showModal,
} from "./renders.js";
import { fetchData } from "./utils/api.js";

const filters = {
  category: "",
  sortBy: "",
  search: "",
};

let priceUsd;

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
});

document.querySelectorAll("#categories-filter li").forEach((li) => {
  li.addEventListener("click", () => {
    const category = li.dataset.category;
    filters.category = category;
    updateProducts();
  });
});

document.querySelectorAll("#orderby-filter li").forEach((li) => {
  li.addEventListener("click", () => {
    const order = li.dataset.order;
    filters.sortBy = order;
    updateProducts();
  });
});

document.getElementById("search-filter").addEventListener("input", (e) => {
  // We need apply debouncing because the input will send a request for each input value
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    filters.search = e.target.value.trim();

    updateProducts();
  }, 500);
});

document
  .getElementById("products_container")
  .addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-show-details")) {
      const sku = e.target.dataset.sku;
      try {
        const product = await fetchData(`${LOCAL_API_URL}/api/products/${sku}`);
        product.priceArs = priceUsd.data;
        showModal(product);
      } catch (err) {
        alert("No se pudo cargar la información del prodcuto");
      }
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
    const container = document.getElementById("products_container");
    container.innerHTML =
      "<p class='btn btn-error'>Error al obtener los productos</p>";
    console.log(err);
  }
}
