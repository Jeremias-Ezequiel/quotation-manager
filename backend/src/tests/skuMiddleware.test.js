import { beforeEach, expect, jest } from "@jest/globals";
import { skuHandler } from "../middlewares/SkuHandler.js";

describe("Middleware: SkuHandler", () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("Should return 400 and invalid message if the sku format is not valid", () => {
    req.params.sku = "XXX-XX";
    skuHandler(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid SKU format. Must be xxx-xxx-xxx",
      data: null,
    });
    expect(next).not.toHaveBeenCalled();
  });

  if (
    ("Should pass the sku if the same is correct",
    () => {
      req.params.sku = "AVC-ASD-AS2";
      skuHandler(req, res, next);
      expect(next).toHaveBeenCalled();
    })
  );
});
