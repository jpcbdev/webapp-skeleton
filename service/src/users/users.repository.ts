import { Injectable, Inject, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { USERS_PROVIDE } from '../shared/constants';
import { Model } from 'mongoose';

import { IUser } from './interfaces';
import { CreateUserDto } from './dtos';
import { USER_ROLE } from './enums';
import { IUpdateResponse } from '../shared/interfaces';

@Injectable()
export class UsersRepository {

    constructor(@Inject(USERS_PROVIDE) private readonly usersModel: Model<IUser>) { }

    async getUsers(conditions = {}): Promise<IUser[]> {
        try {
            const docs = await this.usersModel.find(conditions)
                .and([{ role: { $ne: USER_ROLE.SUPER_ADMIN } }])
                .select({ password: 0, salt: 0, passwordToken: 0, refreshToken: 0 })
            return docs;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getUser(conditions = {}): Promise<IUser> {
        try {
            const doc = await this.usersModel.findOne(conditions).select({ password: 0, salt: 0, passwordToken: 0, refreshToken: 0 })
            return doc;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async createUser(dto: CreateUserDto): Promise<IUser> {
        try {
            const doc = await this.usersModel.create(dto);
            return doc;
        } catch (error) {
            if (error?.code === 11000) {
                throw new BadRequestException('The email or username field is in use');
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateUser(_id: string, body: object): Promise<IUser> {
        try {
            const doc = await this.usersModel.findOneAndUpdate({ _id }, body, { new: true })
            return doc;
        } catch (error) {
            if (error?.code == 11000) {
                throw new BadRequestException('The email or username field is in use');
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateUsers(conditions: object, update: object): Promise<IUpdateResponse> {
        try {
            const query = await this.usersModel.updateMany(conditions, update);
            return query as IUpdateResponse;
        } catch (error) {
            if (error?.code == 11000) {
                throw new BadRequestException('The email or username field is in use');
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async getUserPrivacy(_id: string): Promise<IUser> {
        try {
            const doc = await this.usersModel.findOne({ _id }).select({ salt: 1, password: 1, refreshToken: 1 });
            return doc;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}
