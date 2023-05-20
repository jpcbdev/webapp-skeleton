import React from 'react';

export const FooterComponent = () => {
    return <footer className='footer mt-3'>
        <a className='navbar-brand mx-2' href='/'>
            <img src='logo.png' alt='logo' width={32} />
        </a>
        <span className='footer__license'>
            <p className='m-0'>Example</p>
        </span>
    </footer>
}
