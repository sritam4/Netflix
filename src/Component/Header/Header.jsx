import React from 'react'
import netflixlogo from "../Images/netflixlogo.png"
import MobileLogo from "../Images/Mobile-Logo.png"
import {Link} from "react-router-dom"
import {ImSearch} from "react-icons/im"
import { useMediaQuery } from 'react-responsive'

const Header = () => {
  const isMobile= useMediaQuery({query:'(max-width: 450px)'});
  console.log(isMobile);
  return (
    <nav className='header'>
        {isMobile?(<img src={MobileLogo} alt="Mobilelogo"/>):(<img src={netflixlogo} alt="logo"/>)}
        <div>
          <Link to="/tvshows"> TV Shows </Link>
          <Link to="/"> Movies</Link>
          {!isMobile&&<Link to="/RecentlyAdded"> Recently Added </Link>}
          <Link to="/mylist"> My List </Link>
        </div>

        <ImSearch />
    </nav>
  )
}

export default Header