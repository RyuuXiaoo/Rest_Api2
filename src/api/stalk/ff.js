// stalk-ff.js
const axios = require('axios');

module.exports = function(app) {
  app.get('/stalk/ff', async (req, res) => {
    const { id } = req.query;

    // Validasi input
    if (!id) {
      return res.status(400).json({
        status: false,
        error: 'Parameter id wajib diisi.'
      });
    }

    try {
      const apiUrl = `https://api.kenz.my.id/api/v2/stalking/ff?id=${encodeURIComponent(id)}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.status) {
        // langsung lempar data mentah hasil stalking
        return res.status(200).json({
          status: true,
          result: response.data
        });
      } else {
        return res.status(404).json({
          status: false,
          error: 'Data tidak ditemukan.'
        });
      }
    } catch (error) {
      console.error("Error fetching Free Fire stalk data:", error.message);
      return res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan pada server.'
      });
    }
  });
};
