import { formatPrice } from "./utils/utils.js";

export function renderProductList(products, containerId, { data: priceArs }) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (products.data.length === 0) {
    container.innerHTML =
      "<p class='btn btn-danger'>No products were found. Please try another search.</p>";
    return;
  }

  products.data.forEach((products) => {
    const { id, image_url, sku, name, brand, price_usd, category } = products;

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
                          <a href="#" class="btn btn-primary">SHOW DETAILS</a>
                          <a href="#" class="btn btn-primary">QUOTE PRICE</a>
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
