import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


const Header = () => {
    return(
        <header><Link className="HomeLink" to={"/News-app"} >NC News</Link></header>
    );
}

export default Header;