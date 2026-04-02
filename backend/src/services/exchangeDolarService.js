class ExchangeDolarService {
  async getOfficialChange() {
    try {
      const response = await fetch(`${process.env.DOLAR_API_URL}/oficial`);

      if (response.ok) {
        const data = await response.json();
        return data.venta;
      }

      throw new Error("Error en el service de exchange doalr");
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ExchangeDolarService;
