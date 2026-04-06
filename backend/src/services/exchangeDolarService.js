class ExchangeDolarService {
  #provider;

  constructor(provider) {
    this.#provider = provider;
  }

  async getOfficialChange() {
    try {
      const result = await this.#provider.fetchOfficialDolar();
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ExchangeDolarService;
