import { LOCAL_API_URL } from "./const.js";
import { renderProductList, renderPriceUsdToArs } from "./renders.js";
import { fetchData } from "./utils/api.js";

const filters = {
  category: "",
  sortBy: "",
  search: "",
};

document.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();

  const products = await fetchData(`${LOCAL_API_URL}/api/products`);
  const exchangePrice = await fetchData(
    `${LOCAL_API_URL}/api/exchange-rates/official`,
  );

  renderPriceUsdToArs(exchangePrice.data, "today_price_ars");
  renderProductList(products, "products_container");
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

async function updateProducts() {
  const queryParams = new URLSearchParams({
    category: filters.category,
    sort: filters.sortBy,
    search: filters.search,
  }).toString();

  console.log(queryParams);

  const products = await fetchData(
    `${LOCAL_API_URL}/api/products?${queryParams}`,
  );
  renderProductList(products, "products_container");
}
