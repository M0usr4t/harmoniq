const express = require('express');
const router = express.Router();
const {authorizeUser} = require('../controller/spotify.controller')

router.get('/spotify/authorizeUser', authorizeUser)

module.exports = router