export function renderProductList(products, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = "";

  if (products.data.length === 0) {
    container.innerHTML = "<p>There is not products</p>";
    return;
  }

  products.data.forEach((products) => {
    const { id, image_url, sku, name, brand, price_usd, category } = products;
    const div = document.createElement("DIV");
    div.innerHTML = `<div class="card" style="width: 18rem; height:350px">
                        <img src="${image_url}" class="card-img-top" alt="${id}${sku}">
                        <div class="card-body">
                          <h5 class="card-title">${name}</h5>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">Category: ${category}</li>
                          <li class="list-group-item">Price: $${price_usd} USD</li>
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
