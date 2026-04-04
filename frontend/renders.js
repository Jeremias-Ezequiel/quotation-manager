import { formatPrice } from "./utils/utils.js";

export function renderProductList(products, containerId, { data: priceArs }) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (products.data.length === 0) {
    container.innerHTML =
      "<p class='bg-danger fs-2 fw-bold text-white p-2 rounded'>There are no products with this name. Please try again.</p>";
    return;
  }

  products.data.forEach((product) => {
    const { id, image_url, sku, name, brand, price_usd, category } = product;

    const totalPriceArs = formatPrice(price_usd * priceArs, "es-AR", "ARS");
    const usdFormated = formatPrice(price_usd);

    const div = document.createElement("DIV");
    div.innerHTML = `<div class="card" style="width: 18rem; height:400px">
                        <img src="${image_url}" class="card-img-top" alt="${id}${sku}">
                        <div class="card-body">
                          <h5 class="card-title">${name}</h5>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">Category: ${category}</li>
                          <li class="list-group-item">Price USD: ${usdFormated} USD</li>
                          <li class="list-group-item">Price ARS: ${totalPriceArs} ARS</li>
                          <li class="list-group-item">Brand: ${brand}</li>
                        </ul>
                        <div class="card-body d-flex gap-3">
                          <button href="#" data-sku='${sku}' class="btn btn-primary btn-show-details">SHOW DETAILS</button>
                          <button href="#" class="btn btn-primary">QUOTE PRICE</button>
                          </div>
                        </div>`;
    container.appendChild(div);
  });
}

export function renderPriceUsdToArs(value, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const div = document.createElement("DIV");
  div.classList.add("btn");

  if (!value) {
    div.classList.add("btn-danger");
    div.innerHTML = "Error";
    container.appendChild(div);
    return;
  }

  div.classList.add("btn-success", "fw-bold");
  div.innerHTML = `USD/ARS oficial $${value} ARS`;
  container.appendChild(div);
}

export function showModal({ data, priceArs }) {
  const [product] = data;
  const { name, price_usd } = product;

  document.getElementById("modal-product-title").innerHTML = name;
  document.getElementById("modal-product-usd").innerHTML =
    formatPrice(price_usd);

  const totalPrice = formatPrice(priceArs * price_usd, "es-AR", "ARS");

  document.getElementById("modal-product-ars").innerHTML = totalPrice;

  const btnAdd = document.getElementById("btn-add-quote");
  // btnAdd.onclick(() => {addToQuote(product);});

  const modal = document.getElementById("detailProductModal");
  const instBootstrap = new bootstrap.Modal(modal);
  instBootstrap.show();
}
