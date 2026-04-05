export class Product {
  #id;
  #sku;
  #name;
  #brand;
  #category;
  #price_usd;
  #stock;
  #is_active;
  #image_url;

  constructor(
    id,
    sku,
    name,
    brand,
    category,
    price_usd,
    stock,
    is_active = true,
    image_url = "",
  ) {
    this.#id = id;
    this.#sku = sku;
    this.#name = name;
    this.#brand = brand;
    this.#category = category;
    this.#price_usd = price_usd;
    this.#stock = stock;
    this.#is_active = is_active;
    this.#image_url = image_url;
  }
  getSku() {
    return this.#sku;
  }

  setSku(value) {
    this.#sku = value;
    return this;
  }
  getName() {
    return this.#name;
  }

  setName(value) {
    this.#name = value;
    return this;
  }

  getBrand() {
    return this.#brand;
  }

  setBrand(value) {
    this.#brand = value;
    return this;
  }

  getCategory() {
    return this.#category;
  }

  setCategory(value) {
    this.#category = value;
    return this;
  }

  getPriceUsd() {
    return this.#price_usd;
  }

  setPriceUsd(value) {
    this.#price_usd = value;
    return this;
  }

  getStock() {
    return this.#stock;
  }

  setStock(value) {
    this.#stock = value;
    return this;
  }

  getIsActive() {
    return this.#is_active;
  }

  setIsActive(value) {
    this.#is_active = value;
    return this;
  }

  getImageUrl() {
    return this.#image_url;
  }

  setImageUrl(value) {
    this.#image_url = value;
    return this;
  }

  // First we need conver into an object
  toJson() {
    return {
      id: this.#id,
      sku: this.#sku,
      name: this.#name,
      brand: this.#brand,
      category: this.#category,
      price_usd: this.#price_usd,
      stock: this.#stock,
      is_active: this.#is_active,
      image_url: this.#image_url,
    };
  }

  toString() {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
