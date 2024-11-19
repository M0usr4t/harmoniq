import React from 'react';
import '../styles/mood.css';
import logo from '/logo.png'

const MoodInput = ({userInput, setUserInput, onNext, username}) => {
  return (
    <>
        <img className= 'logo'  src={logo}/>
        <h1 className = 'welcome-header'>Hi, {username}</h1>
        <h2 className= 'question-header'>Tell me how you're feeling and I'll make you a playlist to match your mood</h2>
        <textarea className='mood-input'
            type="text"
            placeholder='ex. I am having a rough day..'
            onChange={(e) => setUserInput({ ...userInput, feeling: e.target.value })}
        />
        <button className='next-button' onClick={() => onNext()}>Next</button>

    </>
  )
}

export default MoodInput
