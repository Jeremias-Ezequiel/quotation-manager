export const clearQueryParams = (req, res, next) => {
  if (req.query) {
    for (let key in req.query) {
      if (typeof req.query[key] === "string") {
        req.query[key] = req.query[key].trim();

        if (req.query[key] === "") {
          delete req.query[key];
        }
      }
    }
  }
  next();
};
