
const axios = require('axios')

module.exports = async (req,res,next) => {
    const {accessToken} = req.userInfo;
    try {
        const availableGenreSeedsResponse = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds',{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        genres = availableGenreSeedsResponse.data.genres
        req.userInfo = { ...req.userInfo, genres };
        next();
    } catch (err) {
        console.error("Error fetching genre seeds: ",{
            message: err.message,
            stack: err.stack,
            responseStatus: err.response?.status,
            responseData: err.response?.data,
        })
        res.status(500).json({ message: 'Failed to fetch Spotify genres' })
    }
}