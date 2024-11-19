import React from 'react'
import logo from '/logo.png'
import '../styles/relatedartists.css'

const RelatedArtistsInput = ({userInput, setUserInput, onNext, onPrevious}) => {
  return (
    <div>
        <img className= 'logo' src={logo}/>
        <h2>Would you to select genres for me to use, or use some of your favorite artists?</h2>
        <div className="choice-buttons">
            <button className='choice-button' onClick={() => onNext(1)}>I would like to select genres</button>
            <button className='choice-button' onClick={() => {
                setUserInput({ ...userInput, useRelatedArtists: true });
                onNext(2);
            }}>
                Use my favorite artists
            </button>
        </div>
        <h2 className= 'genre-warning'>Genres may result in less songs</h2>
        <button className = 'go-back-button' onClick={() => onPrevious()}>Go back</button>
    </div>
  )
}

export default RelatedArtistsInput
