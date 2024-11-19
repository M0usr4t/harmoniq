const axios = require('axios')

module.exports = async (accessToken, seed = 5) => {
   
      try {
        const spotifyResponse = await axios.get('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: seed, 
            offset: 0,
          },
        });
    
        return spotifyResponse.data.items; 

      } catch (err) {
        console.error("Error fetching top artists from Spotify (services):",{
            message: err.message,
            stack: err.stack,
            responseStatus: err.response?.status,
            responseData: err.response?.data,
        });
        throw new Error("Failed to fetch top artists");
      }
    };
