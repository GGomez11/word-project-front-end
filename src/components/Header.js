import React from 'react'
import '../css/Header.css'
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';


function Header () {
    return (
        <nav className="nav-style">
            
            <Link className="home-style" to="/"><HomeIcon sx={{ color: "#E6E6E6" }}/></Link> 
        </nav>
    )
}
export default Header