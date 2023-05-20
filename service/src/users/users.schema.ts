import * as mongoose from 'mongoose';
import { LANGUAGE, TIMEZONE } from '../shared/enums';
import { USER_ROLE, GENDER } from './enums';

import { IUser } from './interfaces';

export const UsersSchema = new mongoose.Schema<string, IUser>({
    name: {
        type: String,
        required: true
    },
    firstSurname: {
        type: String,
        required: true
    },
    secondSurname: {
        type: String,
        default: null
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    passwordToken: {
        type: String,
        default: null
    },
    salt: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    phone: {
        type: String,
        default: null
    },
    timezone: {
        type: String,
        enum: Object.values(TIMEZONE),
        default: TIMEZONE.COSTA_RICA
    },
    language: {
        type: String,
        enum: Object.values(LANGUAGE),
        default: LANGUAGE.SPANISH
    },
    gender: {
        type: String,
        enum: Object.values(GENDER),
        default: GENDER.NON_BINARY
    },
    birthday: {
        type: Date,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    active: {
        type: Boolean,
        required: true,
    },
    confirm: {
        type: Boolean,
        default: false
    },
    identity: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });