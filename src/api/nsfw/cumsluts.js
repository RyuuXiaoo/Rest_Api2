const axios = require('axios');

module.exports = function(app) {
  app.get('/api/cumsluts', async (req, res) => {
    try {
      const response = await axios.get('https://api.nekorinn.my.id/nsfwhub/cumsluts');
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
