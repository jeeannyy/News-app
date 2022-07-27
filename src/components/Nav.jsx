import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



const Nav=()=>{
    return(
        <nav>
            <ul className='navUl'>
            <li className='navLi'><Link className="HomeLink" to={"/"} >Home</Link></li>
            <li className='navLi'>My Account</li>
            </ul>
            </nav>
    );
}

export default Nav;