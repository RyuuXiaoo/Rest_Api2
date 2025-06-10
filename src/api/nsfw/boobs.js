const axios = require('axios');

module.exports = function(app) {
  app.get('/api/boobs', async (req, res) => {
    try {
      const response = await axios.get('https://api.nekorinn.my.id/nsfwhub/boobs');
      res.json({
        status: true,
        creator: "RyuuXiao",
        result: response.data.result
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message
      });
    }
  });
};
