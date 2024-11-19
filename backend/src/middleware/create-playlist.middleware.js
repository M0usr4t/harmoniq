const axios = require('axios');

const createPlaylist = async (req,res,next) => {
    
    try {
        const {playlistTitle} = req.playlistParams

        const response = await axios.post(`https://api.spotify.com/v1/users/${req.spotifyUserId}/playlists`, {
            name: playlistTitle,
            description: 'Generated playlist',
            public: false,
        }, {
            headers: {
                Authorization: `Bearer ${req.accessToken}`
            }
        });

        req.playlistParams.playlistId = response.data.id
        
        next();
    } catch (err) {
        console.error("Error creating Spotify playlist:", {
            message: err.message,                   
            status: err.response?.status,           
            statusText: err.response?.statusText,   
            url: err.config?.url                  
        });
        res.status(500).json({ message: "Failed to create Spotify playlist" });
    }
}

module.exports = createPlaylist;