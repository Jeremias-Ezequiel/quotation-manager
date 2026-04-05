import { StoreProductHandler } from "../middlewares/StoreProductHandler";
import { jest } from "@jest/globals";

describe("Middleware: StoreProductHandler", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("Should throw an error with the sku format", () => {
    req.body.sku = "XXX-XX";

    StoreProductHandler(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("Should throw an error when the name doesn't have the correct format", () => {
    req.body.name = "Jere123123";

    StoreProductHandler(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("Should throw an error when the brand doesn't have the correct format", () => {
    req.body.brand = "Empresa123123";

    StoreProductHandler(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("Should throw an error when the category doesn't have the correct format", () => {
    req.body.category = "category 23";

    StoreProductHandler(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("Should throw an error when the price_usd isn't a number", () => {
    req.body.price_usd = "123";

    StoreProductHandler(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("Should throw an error when the price_usd is negative", () => {
    req.body.price_usd = -123;

    StoreProductHandler(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("Should throw an error when the stock is negative", () => {
    req.body.stock = -123;

    StoreProductHandler(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("Should throw an error when the stock is float", () => {
    req.body.stock = 1.2;

    StoreProductHandler(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});
