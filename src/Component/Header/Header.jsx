import React from 'react'
import netflixlogo from "../Images/netflixlogo.png"
import {Link} from "react-router-dom"
import {ImSearch} from "react-icons/im"

const Header = () => {
  return (
    <nav className='header'>
        <img src={netflixlogo} alt="logo"/>
        <div>
          <Link to="/movies"> TV Shows </Link>
          <Link to="/"> Movies</Link>
          <Link to="/movies"> Recently Added </Link>
          <Link to="/movies"> My List </Link>
        </div>

        <ImSearch />
    </nav>
  )
}

export default Header