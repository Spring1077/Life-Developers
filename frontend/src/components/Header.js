import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <a href="/">
                    <img src="/Rockwell_Automation_Logo.jpg" alt="Logo de la marca" />
                </a>
            </div>
            <nav>
                <ul className="nav-links">
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Solutions & Industries</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Sales & Partners</a></li>
                    <li><a href="/Login">Game</a></li>
                </ul>            
            </nav>
            <div className="user-login">
                <a href="#" className="btn-search">
                    <img src="/lupa.png" alt="Icono de búsqueda" />
                </a>
            </div>        
        </header>
    );
};

export default Header;

