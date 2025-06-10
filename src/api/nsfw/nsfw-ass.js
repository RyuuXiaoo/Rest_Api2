const axios = require('axios');

module.exports = function(app) {
    async function fetchImage() {
        try {
            const { data } = await axios.get('https://api.nekorinn.my.id/nsfwhub/ass');
            const imageRes = await axios.get(data.result, { responseType: 'arraybuffer' });
            return Buffer.from(imageRes.data);
        } catch (err) {
            throw err;
        }
    }

    app.get('/nsfw/ass', async (req, res) => {
        try {
            const buffer = await fetchImage();
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': buffer.length
            });
            res.end(buffer);
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Failed to retrieve image',
                error: error.message
            });
        }
    });
};
