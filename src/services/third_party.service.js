const { google } = require('googleapis');
const config = require('../../config');

const books = google.books({
  version: 'v1',
  auth: config.GOOGLE_API_KEY,
});

class ThirdPartyService {
  static async getVolumes(name) {
    try {
      // Realiza la búsqueda de volúmenes con el cliente oficial de Google Books API
      const response = await books.volumes.list({
        q: `intitle:${name}`,
      });

      return response.data.items || []; // Devuelve los elementos encontrados o un array vacío
    } catch (error) {
      console.error('Error al obtener los volúmenes:', error);
      throw new Error('No se pudieron obtener los volúmenes');
    }
  }
}

module.exports = ThirdPartyService;
