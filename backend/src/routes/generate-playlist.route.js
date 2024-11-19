const express = require('express');
const verifyJWT = require('../middleware/verify-jwt.middleware');
const getPlaylistParams = require('../middleware/get-playlist-params.middleware');
const createPlaylist = require('../middleware/create-playlist.middleware')
const {populatePlaylist} = require('../controller/spotify.controller')
const router = express.Router();


router.post('/spotify/generate-playlist', verifyJWT, getPlaylistParams, createPlaylist, populatePlaylist)

module.exports = router;