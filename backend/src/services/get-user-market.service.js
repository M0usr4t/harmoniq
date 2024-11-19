const axios = require('axios')

module.exports = async(accessToken) => {
    try{
        const spotifyResponse = await axios.get('https://api.spotify.com/v1/me',{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        return spotifyResponse.data.country
    } catch(err){
        console.error('Error fetching user country from Spotify:',{
            message: err.message,
            stack: err.stack,
            responseStatus: err.response?.status,
            responseData: err.response?.data,
        })

    }
}