import { LANGUAGE, TIMEZONE } from '../../shared/enums';
import { GENDER, USER_ROLE } from '../enums';

export interface IUser {
    _id?: string
    name?: string
    firstSurname?: string
    secondSurname?: string
    username?: string
    password?: string
    passwordToken?: string
    salt?: string
    role?: USER_ROLE
    email?: string
    phone?: string
    timezone?: TIMEZONE
    language?: LANGUAGE
    gender?: GENDER
    birthday?: Date
    image?: string
    refreshToken?: string
    createdBy?: string
    active?: boolean
    confirm?: boolean
    identity?: boolean
    deleted?: boolean
}
