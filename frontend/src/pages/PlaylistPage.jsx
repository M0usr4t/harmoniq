import React from 'react'
import NavBar from '../components/NavBar'
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/playlist.css'
import logo from '/logo.png'

const Playlist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, playlistUrl, playlistId, profilePicture } = location.state || {};
  const webLink = `https://open.spotify.com/playlist/${playlistId}`;
  const appLink = `spotify:playlist:${playlistId}`;


  return (
    <>
      <NavBar profilePicture={logo}/>
      <div className="playlist-container">
            <h1>Click the picture to go to your Playlist</h1>
            {playlistUrl ? (
            <a
                href={`spotify:playlist:${playlistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="playlist-button-link"
            >
                <button
                    className="playlist-button"
                    aria-label="Open Playlist"
                    style={{ backgroundImage: `url(${profilePicture})` }}
                />
            </a>
            ) : (
                <p>No playlist available.</p>
            )}
            <button onClick={() => navigate(`/home?token=${localStorage.getItem('authToken')}&username=${encodeURIComponent(username)}&profilePicture=${encodeURIComponent(profilePicture)}`)}>Go Back</button>
        </div>
    </>
  )
}

export default Playlist
