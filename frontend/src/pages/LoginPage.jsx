import {React, useState} from 'react';
import logo from '/logo.png';
import logoName from '/LogoName.png';
import spotifyIcon from '/spotify-brands-solid.svg'
import {handleLogin} from "../services/auth"
import NavBar from '../components/NavBar'
import '../styles/login.css'

const LoginPage = () => {
    const [loggingIn, setLoggingIn] = useState(false);

  return (
    <>
      <NavBar/>
      <div className='login-container'>
        <img src= {logo} alt = 'harmoniq-logo' className='logo'/>
        <h1 className = 'welcome-header'>Welcome to</h1>
        <img src={logoName} className ='logo-name'/>
        {!loggingIn ? (
            <>
                <h1 className = 'spotify-header'> Please log in with your Spotify account.</h1>
                <button className='spotify-login-button' onClick={() => handleLogin(setLoggingIn)}>
                    <img src={spotifyIcon} className="spotify-icon"/>
                </button>
            </>
        ):(<div className='loading-login'> Logging in...</div>)
        }
      </div>
    </>
  )
}

export default LoginPage
