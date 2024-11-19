require('dotenv').config();
const express = require('express');
const cors = require('cors')


const spotifyAuth = require('./src/routes/spotify-auth.route')
const getUserInfo = require('./src/routes/get-user-info.route')
const generatePlaylist = require('./src/routes/generate-playlist.route')


const app = express();
app.use(cors({origin: 'http://localhost:5173'}))
app.use(express.json());

//authorize user's spotify account
app.use('/api', spotifyAuth)

// get user Info for home page
app.use('/api', getUserInfo)

app.use('/api', generatePlaylist)


module.exports = app; 