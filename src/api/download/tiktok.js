const axios = require('axios');
const cheerio = require('cheerio');

module.exports = (app) => {
    const creatorName = "RyuuXiao";

    app.get('/download/tiktok', async (req, res) => {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({
                status: false,
                creator: creatorName,
                message: 'Parameter url wajib diisi'
            });
        }

        try {
            const formUrl = 'https://tikwm.com/';
            const headers = {
                'User-Agent': 'Mozilla/5.0',
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            const form = new URLSearchParams();
            form.append('url', url);
            form.append('hd', 1);

            const response = await axios.post(`${formUrl}api/`, form.toString(), { headers });
            const data = response.data;

            if (data && data.data && data.data.play) {
                res.json({
                    status: true,
                    creator: creatorName,
                    result: {
                        title: data.data.title,
                        author: data.data.author.nickname,
                        nowm: data.data.play,
                        wm: data.data.wmplay,
                        music: data.data.music,
                        thumbnail: data.data.cover,
                        duration: data.data.duration
                    }
                });
            } else {
                res.status(400).json({
                    status: false,
                    creator: creatorName,
                    message: data.msg || 'Gagal mendapatkan data dari Tikwm.'
                });
            }

        } catch (err) {
            console.error("Scrape Error:", err.message);
            res.status(err.response?.status || 500).json({
                status: false,
                creator: creatorName,
                message: err.message || 'Gagal melakukan scraping dari Tikwm.'
            });
        }
    });
};
