import { UsersSchema } from '../users.schema';
import { Connection } from 'mongoose';
import { USERS_PROVIDE, DATABASE_PROVIDE, USERS_MODEL } from '../../shared/constants';

export const UserProvider = [
    {
        provide: USERS_PROVIDE,
        useFactory: (connection: Connection) => connection.model(USERS_MODEL, UsersSchema),
        inject: [DATABASE_PROVIDE],
    },
];
