import React from 'react'
import '../css/Header.css'
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

function Header ({setIsLoggedIn}) {
    const removeToken = (e) => {
        localStorage.removeItem('jwt')
        setIsLoggedIn(false)
    } 
    
    return (
        <nav className="nav-style">
            <Link className="home-style" to="/"><HomeIcon sx={{ color: "#E6E6E6" }}/></Link>
            <Button className="logout-style" onClick={removeToken}><LogoutIcon sx={{ color: "#E6E6E6" }}/></Button> 
        </nav>
    )
}
export default Header