import React from 'react'
import logoName from '/LogoName.png'
import logo from '/logo.png'
import '../styles/navbar.css'

const NavBar = ({ profilePicture }) => {

  return (
    <nav className = "navbar">
      <div className = "navBar-content">
      <img src={logoName} className ='navbar-logo-name'/>
      <img
          src={profilePicture || logo}
          alt="harmoniq-logo"
          className="navbar-logo"
        />
      </div>
    </nav>
  )
}

export default NavBar;
