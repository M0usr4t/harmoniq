const express = require('express');
const router = express.Router();
const getTokens = require('../middleware/get-tokens.middleware')
const {getUserInfo} = require('../controller/spotify.controller')
const getGenreSeeds = require('../middleware/get-genre-seeds.middleware')

router.get('/spotify/user-info', getTokens, getGenreSeeds, getUserInfo)


module.exports = router