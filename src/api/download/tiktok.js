const axios = require('axios');

module.exports = (app) => {
    const creatorName = "RyuuXiao";

    app.get('/download/tiktok', async (req, res) => {
        const { url, format } = req.query; // Bisa "video" atau "audio"

        if (!url) {
            return res.status(400).json({
                status: false,
                creator: creatorName,
                message: 'Parameter url wajib diisi'
            });
        }

        try {
            // Panggil API Tikwm seperti di web kamu
            const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
            const response = await axios.get(apiUrl);

            const data = response.data;

            if (!data || data.status !== 1 || !data.data) {
                return res.status(400).json({
                    status: false,
                    creator: creatorName,
                    message: 'Gagal mengambil data dari API Tikwm'
                });
            }

            const result = {
                title: data.data.title,
                cover: data.data.cover,
                video_no_watermark: data.data.play,
                video_with_watermark: data.data.wmplay,
                music: data.data.music,
                author: data.data.author?.nickname || '',
                avatar: data.data.author?.avatar || ''
            };

            // Jika user minta khusus format video/audio saja
            if (format === 'video') {
                return res.json({
                    status: true,
                    creator: creatorName,
                    result: {
                        video: result.video_no_watermark
                    }
                });
            } else if (format === 'audio') {
                return res.json({
                    status: true,
                    creator: creatorName,
                    result: {
                        audio: result.music
                    }
                });
            }

            // Jika tidak spesifik, kirim semua
            return res.json({
                status: true,
                creator: creatorName,
                result
            });

        } catch (err) {
            console.error("TikTok Downloader Error:", err.message || err);
            res.status(500).json({
                status: false,
                creator: creatorName,
                message: 'Terjadi kesalahan saat memproses video TikTok'
            });
        }
    });
};
