import React from 'react';

const currentYear = new Date().getFullYear();

const Footer = () => {
    return(
        <footer>Copyright © {currentYear} Jeeanny🦕. All rights reserved.</footer>
    );
}


export default Footer;