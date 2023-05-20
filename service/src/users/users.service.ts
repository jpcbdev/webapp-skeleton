import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UsersRepository } from './users.repository';

import { IUser } from './interfaces';
import * as bcrypt from 'bcrypt';
import { uid } from 'uid';

import { USER_ROLE } from './enums';
import { IAuthUser } from '../authorization/interfaces';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) { }

    async getUsers(authUser: IAuthUser): Promise<IUser[]> {
        const conditions = this.getUserConditionsByRole(authUser);
        const users = await this.usersRepository.getUsers(conditions);
        return users;
    }

    async createUser(dto: CreateUserDto, authUser?: IAuthUser): Promise<IUser> {
        if (authUser) this.checkCreateUserRole(dto, authUser);
        dto.createdBy = authUser?._id ?? null;
        dto.active = true;
        dto.confirm = true;
        await this.setHashPassword(dto);
        const user = await this.usersRepository.createUser(dto);
        return user;
    }

    async getUserById(_id: string): Promise<IUser> {
        const user = await this.usersRepository.getUser({ _id, deleted: false });
        if (!user) throw new BadRequestException('User not found');
        return user;
    }

    async getUserByConditions(conditions: object): Promise<IUser> {
        const user = await this.usersRepository.getUser(conditions);
        if (!user) throw new BadRequestException('User not found');
        return user;
    }

    async updateUser(_id: string, dto: UpdateUserDto): Promise<IUser> {
        await this.getUserById(_id);
        const user = await this.usersRepository.updateUser(_id, dto);
        return user;
    }

    private async updateUsers(conditions: object, update: object): Promise<void> {
        await this.usersRepository.updateUsers(conditions, update);
    }

    async deleteUser(_id: string): Promise<IUser> {
        const user = await this.updateUser(_id, { deleted: true } as UpdateUserDto);
        await this.updateUsers({ createdBy: user._id }, { deleted: true, active: false });
        return user;
    }

    async getUserPrivacy(_id: string): Promise<IUser> {
        const user = await this.usersRepository.getUserPrivacy(_id);
        return user;
    }

    async getUserResetToken(_id: string): Promise<string> {
        const user = await this.usersRepository.getUserPrivacy(_id);
        return user?.refreshToken ?? '';
    }

    private async setHashPassword(dto: CreateUserDto): Promise<void> {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(dto.password ?? uid(), salt);
        dto.salt = salt;
        dto.password = hashPassword;
    }

    async getUserAvailability(_id: string): Promise<IUser> {
        const user = await this.usersRepository.getUser({ _id });
        if (!user || user.deleted === true) throw new BadRequestException('User not found');
        if (!user.confirm) throw new BadRequestException('User not confirmed');
        if (!user.active) throw new BadRequestException('User blocked');
        return user;
    }

    private checkCreateUserRole(dto: CreateUserDto, authUser: IAuthUser) {
        switch (authUser.role) {
            case USER_ROLE.COMPANY: {
                if (dto.role !== USER_ROLE.EMPLOYEE) throw new BadRequestException('Only employee users are allowed to create')
                break;
            }
            default: { }
        }
    }

    private getUserConditionsByRole(authUser: IAuthUser): object {

        switch (authUser.role) {
            case USER_ROLE.SUPER_ADMIN: {
                return { role: USER_ROLE.COMPANY }
            }
            case USER_ROLE.COMPANY: {
                return { createdBy: authUser._id, deleted: false }
            }
            default: { return {} }
        }
    }

}