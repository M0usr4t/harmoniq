import React from 'react';
import '../styles/genre.css'
import logo from '/logo.png'
import Select from 'react-select';
import customStyles from '../styles/selectDropdown';

const GenreInput = ({userInput, setUserInput, onNext, onPrevious, genreList}) => {

  const handleChange = (selectedOptions) => {
    if (selectedOptions.length <= 5) {
      setUserInput({ ...userInput, selectedGenres: selectedOptions });
    }
  };

  return (
    <div className = "genre-container">
        <img className= 'logo'  src={logo}/>
        <h2>Select up to 5 genres for me to use</h2>
        <Select
          classNamePrefix="custom-select"
          closeMenuOnSelect={false}
          isMulti
          value={userInput.selectedGenres}
          options={genreList}
          onChange={handleChange}
          styles={customStyles}
          />
          {userInput.selectedGenres.length >= 5 && (
                <p style={{ color: 'red' }}>You can only select up to 5 genres</p>
            )}
        <div className="genre-buttons">
                <button
                    className="choice-button"
                    onClick={() => onPrevious()}
                >
                    Previous
                </button>
                <button
                    className="choice-button"
                    onClick={() => onNext()}
                    disabled={userInput.selectedGenres.length === 0}
                >
                    Next
                </button>
        </div>   
    </div>
  )
}

export default GenreInput
