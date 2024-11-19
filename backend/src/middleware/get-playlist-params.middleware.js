const getUserTopArtists = require('../services/get-user-top-artists.service')
const getUserMarket = require('../services/get-user-market.service')
const axios = require('axios')


const getPlaylistParams = async (req,res,next) => {
    const accessToken = req.accessToken;
    const {feeling, selectedGenres, useRelatedArtists, playlistTitle} = req.body 
    
    try{
        const response = await axios.post('http://127.0.0.1:8000/analyze', {
            text: feeling
        });

        const { valence_range: valenceRange, energy_range: energyRange } = response.data;
        const genres = selectedGenres && selectedGenres.length > 0 ? selectedGenres.map(genre => genre.value) : null;
        let seedArtists = undefined

        if(useRelatedArtists){
          try{
              const artists = await getUserTopArtists(accessToken); 
              seedArtists = artists.map(artist => artist.id).join(',')
          } catch (err) {
            console.error("Error fetching top artists from Spotify (middleware):",{
              message: err.message,
              stack: err.stack,
              responseStatus: err.response?.status,
              responseData: err.response?.data,
            })
          }
      }

      const userMarket = await getUserMarket(accessToken)

      req.playlistParams = {
        playlistTitle,
        userMarket,
        seedGenres: genres ? genres.join(',') : undefined,
        seedArtists,
        minValence: valenceRange[0],
        maxValence: valenceRange[1],
        minEnergy: energyRange[0],
        maxEnergy: energyRange[1],
      }

      next();

    } catch (err) {
      console.error("Error processing playlist data:", {
        message: err.message,
        stack: err.stack,
        responseStatus: err.response?.status,
        responseData: err.response?.data,
      })
      res.status(500).json({message: "Failed to process playlist"})
    }
}

module.exports = getPlaylistParams