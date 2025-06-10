const axios = require('axios');
module.exports = function (app) {
  async function bdsm() {
    try {
      const { data } = await axios.get(`https://api.nekorinn.my.id/nsfwhub/bdsm`);
      const imageUrl = data.result;
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      return {
        buffer: Buffer.from(response.data),
        contentType: response.headers['content-type'] || 'image/jpeg'
      };
    } catch (error) {
      throw error;
    }
  }

  app.get('/nsfw/bdsm', async (req, res) => {
    try {
      const { buffer, contentType } = await bdsm();
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': buffer.length
      });
      res.end(buffer);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  });
};
