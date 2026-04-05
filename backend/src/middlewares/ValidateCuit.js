export const validateCuit = (req, res, next) => {
  const { cuit } = req.body;
  const regex = /^[0-9]{2}-?[0-9]{8}-?[0-9]{1}$/;

  if (!regex.test(cuit)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid CUIT. The CUIT should have xx-xxxxxxxx-x or 11 numbers.",
      data: null,
    });
  }

  next();
};
