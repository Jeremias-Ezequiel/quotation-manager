export const StoreProductHandler = (req, res, next) => {
  const {
    sku,
    name,
    brand,
    category,
    price_usd,
    stock,
    image_url = "",
  } = req.body;

  const errors = [];

  // validate SKU;
  const cleanSku = sku ? String(sku).trim().toUpperCase() : "";
  const skuRegexPattern = /^([A-Z0-9]{2,}-){2}[A-Z0-9]{2,}(-[A-Z0-9]{2,})?$/;
  if (!cleanSku || !skuRegexPattern.test(cleanSku)) {
    errors.push("Invalid SKU format. Must be xxx-xxx-xxx");
  }

  // Validate naMe
  const cleanName = name ? String(name).trim() : "";
  const stringValidate = /^[A-Za-zñÑáéíóúÁÉÍÓÚ]{3,}$/;
  if (!cleanName || !stringValidate.test(name)) {
    errors.push("The name must have letters and at least 3 letters.");
  }

  //validate brand
  const cleanBrand = name ? String(brand).trim().toLowerCase() : "";
  if (!cleanBrand || !stringValidate.test(cleanBrand)) {
    errors.push("The brand must have only letters");
  }

  // validate category
  const cleanCategory = category ? String(category).trim().toLowerCase() : "";
  if (!cleanBrand || !stringValidate.test(cleanCategory)) {
    errors.push("The category must have only letters.");
  }

  // validate price usd → Obligatory parsed y el stock también
  const cleanPrice = Number(price_usd);
  if (isNaN(cleanPrice) || cleanPrice <= 0) {
    errors.push("The price must be at least a price greater than 0.");
  }

  //validate stock
  const cleanStock = Number(stock);
  if (isNaN(cleanStock) || !Number.isInteger(cleanStock) || cleanStock <= 0) {
    errors.push("Stock must be an integer greater than 0.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      data: errors,
    });
  }

  req.body = {
    sku: cleanSku,
    name: cleanName,
    brand: cleanBrand,
    category: cleanCategory,
    price_usd: cleanPrice,
    stock: cleanStock,
    image_url: image_url,
  };

  next();
};
