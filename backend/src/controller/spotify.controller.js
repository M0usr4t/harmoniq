const queryString = require('querystring');
const crypto = require('crypto');
const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SCOPE, JWT_SECRET } = process.env;
const { getTracks, addTracksToPlaylist } = require('../services/playlist-helpers.services')
const axios = require('axios')
const jwt = require('jsonwebtoken');

const authorizeUser = (req,res) => {
    const state = crypto.randomBytes(16).toString('hex');
    
    res.redirect('https://accounts.spotify.com/authorize?' +
        queryString.stringify({
            response_type: 'code',
            client_id: SPOTIFY_CLIENT_ID,
            scope: SCOPE,
            redirect_uri: SPOTIFY_REDIRECT_URI,
            state: state
        })
    )
}

const getUserInfo = async (req,res) => {
    const { accessToken, genres } = req.userInfo;

    try {
        const spotifyUserInfoResponse = await axios.get(
            'https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
        });
        const {id: spotifyUserId, display_name: displayName, email, images} = spotifyUserInfoResponse.data
        const image = images.length ? images[0].url : null
        const encodedGenres = encodeURIComponent(JSON.stringify(genres));

        const JWToken = jwt.sign(
            { accessToken, spotifyUserId },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.redirect(
            `http://localhost:5173/home?token=${JWToken}&username=${encodeURIComponent(displayName)}&profilePicture=${encodeURIComponent(image)}&&genres=${encodedGenres}`
        );
    } catch (err) {
        console.error("Error getting user info from Spotify: ",{
            message: err.message,
            stack: err.stack,
            responseStatus: err.response?.status,
            responseData: err.response?.data,
        })
    }
}

const populatePlaylist = async (req,res) => {
    try {
        const { playlistId } = req.playlistParams

        const recommendedTracks = await getTracks(req.accessToken, req.playlistParams);
        await addTracksToPlaylist(req.accessToken, playlistId, recommendedTracks);

        res.status(200).json({ playlistId, playlistUrl: `https://open.spotify.com/playlist/${playlistId}` });

    } catch (err) {
        console.error("Error adding tracks to Spotify playlist(controller):", 
            {
                message: err.message,
                status: err.response?.status,
                statusText: err.response?.statusText,
                url: err.config?.url
            });
    }
}



module.exports = {authorizeUser,getUserInfo, populatePlaylist};