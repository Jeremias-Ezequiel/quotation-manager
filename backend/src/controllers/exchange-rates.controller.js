import ExchangeDolarService from "../services/exchangeDolarService.js";

const service = new ExchangeDolarService();

class ExchangeController {
  getOfficialChange = async (req, res) => {
    try {
      const result = await service.getOfficialChange();
      res.status(200).json({
        success: true,
        message: "official dollar obtained correctly",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error obtaining the official exchange rate",
        data: null,
      });
    }
  };
}

export default new ExchangeController();
