import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



const Nav=()=>{
    return(
        <nav>
            <ul className='navUl'>
            <li className='navLi'><Link className="HomeLink" to={"/News-app"} >Home</Link></li>
            <li className='navLi'><Link className="accontLink" to={"/account"} >My Account</Link></li>
            </ul>
            </nav>
    );
}

export default Nav;