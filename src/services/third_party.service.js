class ThirdPartyService {
  static googleUrl = process.env.PUBLIC_GOOGLE_BOOKS || '';
  static async getVolumes(name) {
    const response = await fetch(`${this.googleUrl}/volumes?q=intitle:${name}`);
    const data = await response.json();
    return data; // Devuelve los datos del usuario
  }
}
module.exports = ThirdPartyService;
