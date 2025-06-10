
const axios = require('axios');

module.exports = function(app) {
    app.get('/stalk/mlbb', async (req, res) => {
        const { userId, zoneId } = req.query;

        if (!userId || !zoneId) {
            return res.status(400).json({
                status: false,
                error: 'Parameter userId dan zoneId wajib diisi.'
            });
        }

        try {
            const apiUrl = `https://deoberon-api.vercel.app/stalk/mlbb?userId=${userId}&zoneId=${zoneId}`;
            const response = await axios.get(apiUrl);

            if (response.data && response.data.status) {
                const { username, country, country_flag } = response.data;

                return res.status(200).json({
                    status: true,
                    result: {
                        username,
                        country,
                        country_flag
                    }
                });
            } else {
                return res.status(404).json({
                    status: false,
                    error: 'Data tidak ditemukan.'
                });
            }
        } catch (error) {
            console.error("Error fetching MLBB stalk data:", error.message);
            return res.status(500).json({
                status: false,
                error: 'Terjadi kesalahan pada server.'
            });
        }
    });
};
