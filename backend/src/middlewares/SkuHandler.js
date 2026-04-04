export const skuHandler = (req, res, next) => {
  const regexPattern = /^([A-Z0-9]{2,}-){2}[A-Z0-9]{2,}(-[A-Z0-9]{2,})?$/;
  const { sku } = req.params;

  if (!regexPattern.test(sku)) {
    return res.status(400).json({
      success: false,
      message: "Invalid SKU format. Must be xxx-xxx-xxx",
      data: null,
    });
  }

  next();
};
