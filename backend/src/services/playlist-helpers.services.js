const axios = require('axios')

const getTracks = async (accessToken, params) => {
    const { seedGenres, userMarket, seedArtists, minValence, maxValence, minEnergy, maxEnergy } = params;  

    const spotifyResponse = await axios.get('https://api.spotify.com/v1/recommendations', {
        params: {
            market: userMarket,
            seed_genres: seedGenres,
            seed_artists: seedArtists,
            min_valence: minValence,
            max_valence: maxValence,
            min_energy: minEnergy,
            max_energy: maxEnergy,
            limit: 20
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });  

    return spotifyResponse.data.tracks.map(track => track.uri);
};

const addTracksToPlaylist = async (accessToken, playlistId, trackUris) => {

    try {
        await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            uris: trackUris
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch (err) {
        console.error("Error adding tracks to Spotify playlist(service):", 
            {
                message: err.message,
                status: err.response?.status,
                statusText: err.response?.statusText,
                url: err.config?.url
            });
    }

};

module.exports = {
    getTracks,
    addTracksToPlaylist
};