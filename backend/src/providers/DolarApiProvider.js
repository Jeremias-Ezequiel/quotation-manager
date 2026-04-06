class DolarApiProvider {
  async fetchOfficialDolar() {
    try {
      const response = await fetch(`${process.env.DOLAR_API_URL}/oficial`);

      if (!response.ok) {
        throw new Error("Error in the API Dolar");
      }
      const data = await response.json();
      return data.venta;
    } catch (err) {
      throw new Error(`DolarApiProvider Error: ${err.message}`);
    }
  }
}

export default DolarApiProvider;
