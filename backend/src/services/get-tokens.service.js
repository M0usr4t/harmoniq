const axios = require('axios')
const queryString = require('querystring')
const { SPOTIFY_CLIENT_ID, 
        SPOTIFY_CLIENT_SECRET, 
        SPOTIFY_REDIRECT_URI,
        JWT_SECRET } = process.env;

module.exports = async (code) => {
    try{
        const spotifyResponse = await axios.post(
            "https://accounts.spotify.com/api/token",
            queryString.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET
            }
        ),  {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
        if (!spotifyResponse || !spotifyResponse.data) {
            throw new Error('Invalid response from Spotify');
        }

        return {
            accessToken: spotifyResponse.data.access_token
        };
    } catch (err) {
        console.error("Error exchanging tokens from spotify (services): ",{
            message: err.message,
            stack: err.stack,
            responseStatus: err.response?.status,
            responseData: err.response?.data,
        })
    }
}
