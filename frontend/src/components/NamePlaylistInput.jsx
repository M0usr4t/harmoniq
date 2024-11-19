import React from 'react'
import '../styles/namePlaylist.css'
import logo from '/logo.png'

const PlaylistNameInput = ({userInput, setUserInput, onPrevious, handleCreatePlaylist}) => {
  return (
        <div className="name-playlist-container">
            <img className="logo" src={logo} alt="Logo" />
            <h2>What do you want to name your playlist?</h2>
            <input
                className="playlist-input"
                type="text"
                placeholder="(optional) ex. In my feels"
                onChange={(e) =>
                    setUserInput({ ...userInput, playlistTitle: e.target.value })
                }
            />
            <div className="name-playlist-buttons">
                <button
                    className="choice-button"
                    onClick={() => onPrevious(userInput.genreList === 0 ? 2 : 1)}
                >
                    Previous
                </button>
                <button
                    className="choice-button"
                    onClick={handleCreatePlaylist}
                >
                    Create my playlist
                </button>
            </div>
        </div>
  )
}

export default PlaylistNameInput
