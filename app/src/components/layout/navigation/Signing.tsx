import { CookieStorageUtil } from '@/shared/utils';
import { signing } from '@/store';
import React, { useEffect, useState } from 'react';

export const Signing = () => {
    const [loginForm, setLoginForm] = useState({ searchCriteria: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const clean = () => {
        setLoginForm({
            searchCriteria: '',
            password: ''
        });
        setErrorMessage('');
    }

    const onModalEventListener = () => {
        const targetModal = document.querySelector('#loginModal') as any;
        targetModal.addEventListener('hidden.bs.modal', () => clean());
    }

    useEffect(() => onModalEventListener(), []);

    const handleSigning = async () => {
        const data = await signing(loginForm.searchCriteria, loginForm.password);
        if (data) {
            CookieStorageUtil.setToken(data?.token);
            window.location.href = '/';
        };
    }

    return <div className='modal fade' id='loginModal' tabIndex={-1} aria-labelledby='loginModalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    <div className='modal__header__title'>
                        <img className='me-2' height={48} src='logo.png' alt='logo' />
                        <h4 className='modal-title' id='loginModalLabel'>Example</h4>
                    </div>
                </div>
                <div className='modal-body'>

                    <div className='form-group mb-4'>
                        <label htmlFor='searchCriteria'>Correo o usuario</label>
                        <input type='text'
                            className='form-control'
                            id='searchCriteria'
                            aria-describedby='emailHelp'
                            value={loginForm.searchCriteria}
                            onChange={e => setLoginForm({ ...loginForm, searchCriteria: e.target.value })}
                            autoComplete='current-username'
                            placeholder='Ingresa tu correo electrónico o usuario'
                        />
                    </div>

                    <div className='form-group mb-4'>
                        <label htmlFor='signingPassword'>Contraseña</label>
                        <input type='password'
                            className='form-control'
                            id='signingPassword'
                            value={loginForm.password}
                            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                            autoComplete='current-password'
                            placeholder='Ingresa tu contraseña'
                        />
                    </div>

                </div>

                <div className="modal-footer">
                    <button type='button' className='btn btn-primary ' onClick={handleSigning}>Ingresar</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

}