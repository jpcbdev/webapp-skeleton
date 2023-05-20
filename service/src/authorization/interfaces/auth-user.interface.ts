import { TIMEZONE } from '../../shared/enums';
import { USER_ROLE } from '../../users/enums';

export interface IAuthUser {
    _id?: string
    role?: USER_ROLE
    email?: string
    name?: string
    firstSurname?: string,
    username?: string
    timezone?: TIMEZONE
}