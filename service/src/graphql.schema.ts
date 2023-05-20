
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SigningInput {
    searchCriteria: string;
    password: string;
}

export class CreateUserInput {
    name: string;
    firstSurname: string;
    username: string;
    email: string;
    role: string;
}

export class UpdateUserInput {
    _id?: Nullable<string>;
    name?: Nullable<string>;
    firstSurname?: Nullable<string>;
    secondSurname?: Nullable<string>;
}

export class DeleteUserInput {
    _id: string;
}

export class Access {
    token?: Nullable<string>;
}

export abstract class IMutation {
    abstract signing(signingInput?: Nullable<SigningInput>): Nullable<Access> | Promise<Nullable<Access>>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteUser(deleteUserInput?: Nullable<DeleteUserInput>): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export class User {
    _id?: Nullable<string>;
    name?: Nullable<string>;
    firstSurname?: Nullable<string>;
    secondSurname?: Nullable<string>;
    username?: Nullable<string>;
    role?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    active?: Nullable<boolean>;
    timezone?: Nullable<string>;
    language?: Nullable<string>;
    gender?: Nullable<string>;
    birthday?: Nullable<string>;
    image?: Nullable<string>;
    deleted?: Nullable<boolean>;
}

export abstract class IQuery {
    abstract getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

type Nullable<T> = T | null;
