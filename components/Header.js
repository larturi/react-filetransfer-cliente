import React from 'react';

const Header = () => {
    return (
        <header className="py-8 flex flex-col md:flex-row items-center justyfy-between">
           <img className="w-64 mb-8 md:mb-0" src="logo.png"/>
        </header>
    )
}

export default Header;