class ExchangeDolarService {
  async getOfficialChange() {
    try {
      const response = await fetch(`${process.env.DOLAR_API_URL}/oficial`);
      const data = await response.json();
      return data.venta;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ExchangeDolarService;
