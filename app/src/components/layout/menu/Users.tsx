import { IUser, getUsers, deleteUser } from '@/store';
import { EditUser } from './users/EditUserModal';
import { useEffect, useMemo, useState } from 'react';

import { Table } from '../../Table';

export const Users = () => {

    const [users, setUsers] = useState([] as IUser[]);

    const handleGetUsers = async () => {
        const query = await getUsers();
        if (query) setUsers(query);
    }

    const handleDeleteUser = async (_id = '') => {
        const query = await deleteUser({ _id });
        if (query) {

        }
    }

    const columns = useMemo(() =>
        [
            {
                Header: 'Usuario',
                Footer: 'Usuario',
                accessor: 'username',
                disableFilters: false,
                sticky: 'left',
                Cell: ({ row }: any) => (<span className={'m-0 p-0'}>{row.original.username} - Deleted: {`${row.original.deleted}`}</span>)
            },
            {
                Header: 'Tipo',
                Footer: 'Tipo',
                accessor: 'role',
                disableFilters: false,
                sticky: 'left',
                Cell: ({ row }: any) => (<span className='m-0 p-0'>{row.original?.role.toUpperCase()}</span>)
            },
            {
                Header: 'Actions',
                Footer: 'Actions',
                accessor: null,
                disableFilters: false,
                sticky: 'left',
                Cell: ({ row }: any) => (<div className='m-0 p-0'>
                    <button className='btn btn-small btn-danger' onClick={() => handleDeleteUser(row.original._id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>)
            },
        ], []);

    useEffect(() => {
        handleGetUsers();
    }, []);

    return <div className='container mt-2'>
        <EditUser onCreateUser={handleGetUsers} update={false} />
        <div className="row">
            <div className="col-2 text-center">
                <h4 className="text-success m-0 pt-2">Usuarios</h4>
            </div>
            <div className="col-2 offset-8 text-center">
                <button className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#createUserModal'><i className='fas fa-plus-circle'></i></button>
            </div>
        </div>
        <div className='row'>
            <div className='col-12'>
                <Table columns={columns} data={users} />
            </div>
        </div>
    </div>
}