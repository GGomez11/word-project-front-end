import React from 'react'
import '../css/Header.css'
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Button } from '@mui/material';

function Header ({setIsLoggedIn, setDarkMode, darkMode}) {
    const removeToken = (e) => {
        localStorage.removeItem('jwt')
        setIsLoggedIn(false)
        console.log('Remove Token')
    } 

    const toggleDarkMode = (e) => {
        const darkModeStorage = localStorage.getItem('darkmode') !== null ? !localStorage.getItem('darkmode') : 'false'
        setDarkMode(darkModeStorage)
        console.log(darkModeStorage)
        localStorage.removeItem('darkmode')
        localStorage.setItem('darkmode', darkModeStorage)
    }
    
    return (
        <nav className="nav-style">
            <Link className="home-style" to="/"><HomeIcon sx={{ color: "#E6E6E6" }}/></Link>
            <Button className="logout-style" onClick={removeToken}><LogoutIcon sx={{ color: "#E6E6E6" }}/></Button>
            <Button className="darkmode-style" onClick={toggleDarkMode}><DarkModeIcon sx={{ color: "#E6E6E6" }}/></Button>
        </nav>
    )
}
export default Header