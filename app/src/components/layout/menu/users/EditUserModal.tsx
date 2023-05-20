import { createUser } from '@/store';
import React, { useEffect, useState } from 'react';
import { Notification } from '../../../../shared/utils';

export const EditUser = ({ onCreateUser, update }: { onCreateUser: Function, update: boolean }) => {

  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    firstSurname: '',
    role: '',
  });

  const handleCreateUser = async () => {
    try {
      const query = await createUser(user);
      if (query === true) onCreateUser();
      Notification.showSuccess('Acción realizada con éxito');
    } catch (error: any) {
      Notification.showError(error.graphQLErrors?.map((error: any) => error.message)[0] ?? 'Error')
    }
    finally { }
  }

  const clean = () => {
    setUser({
      name: '',
      username: '',
      password: '',
      email: '',
      firstSurname: '',
      role: ''
    });
    setErrorMessage('');
  }

  useEffect(() => onModalEventListener(), []);

  const onModalEventListener = () => {
    const targetModal = document.querySelector('#createUserModal') as any;
    targetModal.addEventListener('hidden.bs.modal', () => clean());
  }

  return <div className='modal fade' id='createUserModal' tabIndex={-1} aria-labelledby='createUserModalLabel' aria-hidden='true'>
    <div className='modal-dialog'>
      <div className='modal-content'>
        <div className='modal-header'>
          <button type='button' className='btn-close btn-close-white' data-bs-dismiss='modal' aria-label='Close'></button>

          <h4 className='modal-title' id='createUserModalLabel'>Crear usuario</h4>
        </div>
        <div className='modal-body'>

          <div className='form-group mb-4 error-message-container' hidden={!errorMessage}>
            <i className='fas fa-exclamation-triangle text-danger me-2'></i>
            <small>{errorMessage}</small>
          </div>

          <div className='form-group mb-4'>
            <label htmlFor='userName'>Nombre<b className='text-danger'>*</b></label>
            <input
              type='text'
              className='form-control custom-input'
              id='userName'
              value={user.name}
              onChange={e => setUser({ ...user, name: e.target.value })}
              autoComplete='empty-name'
              placeholder='Ingresa el nombre'
            ></input>
          </div>

          <div className='form-group mb-4'>
            <label htmlFor='userFirstSurname'>Primer apellido<b className='text-danger'>*</b></label>
            <input
              type='text'
              className='form-control custom-input'
              id='userFirstSurname'
              value={user.firstSurname}
              onChange={e => setUser({ ...user, firstSurname: e.target.value })}
              autoComplete='empty-userFirstSurname'
              placeholder='Ingresa el primer apellido'
            ></input>
          </div>

          <div className='form-group mb-4'>
            <label htmlFor='userUsername'>Usuario<b className='text-danger'>*</b></label>
            <input
              type='text'
              className='form-control custom-input'
              id='userUsername'
              value={user.username}
              onChange={e => setUser({ ...user, username: e.target.value })}
              autoComplete='empty-username'
              placeholder='Ingresa el usuario'
            ></input>
          </div>

          <div className='form-group mb-4'>
            <label htmlFor='email'>Correo<b className='text-danger'>*</b></label>
            <input
              type='email'
              className='form-control custom-input'
              id='email'
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              autoComplete='empty-email'
              placeholder='Ingresa el correo electrónico'
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="userRole">Tipo
              {
                !update ? <small className="form-text text-danger">*</small> : <></>
              }
            </label>
            <select
              className="form-control" id="userRole"
              disabled={update ? true : false}
              value={user.role}
              onChange={e =>
                setUser({ ...user, role: e.target.value })
              }>
              <option value=""></option>
              <option value="admin">Administrador</option>
              <option value="company">Compañía</option>
              <option value="employee">Empleado</option>
            </select>
          </div>

          <div className='form-group text-center my-2'>
            <small className='form-text text-muted'>(<strong className='text-danger'>*</strong>) Campos requeridos</small>
          </div>

        </div>
        <div className="modal-footer">
          <button type='button' className='btn btn-primary' onClick={handleCreateUser}>
            Crear
          </button>
          <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>

    </div>

  </div>

}