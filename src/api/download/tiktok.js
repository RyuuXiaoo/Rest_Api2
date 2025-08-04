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
            // Ambil halaman utama Tikwm.com untuk token
            const getPage = await axios.get('https://tikwm.com/', {
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            });

            const $ = cheerio.load(getPage.data);
            const token = $('input[name="token"]').val();

            if (!token) {
                return res.status(500).json({
                    status: false,
                    creator: creatorName,
                    message: 'Gagal mengambil token dari Tikwm.com'
                });
            }

            // Kirim request ke Tikwm endpoint dengan token & URL
            const response = await axios.post(
                'https://tikwm.com/api/',
                new URLSearchParams({
                    url: url,
                    token: token
                }),
                {
                    headers: {
                        'User-Agent': 'Mozilla/5.0',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            const data = response.data;

            if (!data || data.status !== 1) {
                return res.status(400).json({
                    status: false,
                    creator: creatorName,
                    message: data.msg || 'Gagal mendapatkan data video'
                });
            }

            // Kirim hasil ke user
            return res.json({
                status: true,
                creator: creatorName,
                result: {
                    title: data.data.title,
                    thumbnail: data.data.cover,
                    video_no_watermark: data.data.play,
                    video_with_watermark: data.data.wmplay,
                    music: data.data.music,
                    author: data.data.author.nickname,
                    avatar: data.data.author.avatar
                }
            });

        } catch (err) {
            console.error("Scrape TikTok Error:", err.message || err);
            return res.status(500).json({
                status: false,
                creator: creatorName,
                message: 'Terjadi kesalahan saat mengambil data dari TikTok'
            });
        }
    });
};
