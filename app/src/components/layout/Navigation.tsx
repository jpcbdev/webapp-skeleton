import React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Signing } from './navigation/Signing';
import { CookieStorageUtil } from '@/shared/utils';

export const NavigationComponent = () => {

  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({
    role: '',
    active: false,
    _id: '',
    name: '',
    firstSurname: '',
    secondSurname: '',
    username: '',
    email: '',
    gender: 0,
    birthday: ''
  });

  useEffect(() => {
    setAuthenticated(CookieStorageUtil.isAuthenticated())
  }, []);

  const handleLogOut = () => {
    CookieStorageUtil.remove();
  }

  return <Fragment>

    <Signing />

    <nav className='navbar w-100'>
      <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navigationNav'
        aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'>
          <i className='fas fa-bars'></i>
        </span>
      </button>

      <a className='navbar-brand mx-2' href='/'>
        <img className='navbar-brand__image' src='logo.png' alt='logo' width={38} /> {router.pathname === '/account' ? <h5 className='m-0 pt-1 text-muted'>| Cuenta</h5> : <></>}
      </a>

      <div className='collapse navbar-collapse' id='navigationNav'>

        <ul className='navbar-nav navbar-nav-scroll'>
          {
            !authenticated ?
              <li className='nav-item v-align'>
                <a type='button' className='nav-link' data-bs-toggle='modal' data-bs-target='#loginModal'>
                  Iniciar sesión
                </a>
              </li> : null
          }

          {
            authenticated ?
              <li className='nav-item v-align'>
                <a type='button' className='nav-link' onClick={handleLogOut}>
                  Cerrar sesión
                </a>
              </li> : null
          }

        </ul>

      </div>

    </nav >

  </Fragment >
};