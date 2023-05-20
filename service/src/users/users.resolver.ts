import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

import { IUser } from './interfaces';
import { UpdateUserDto } from './dtos';
import { ByIdDto } from '../shared/dtos';

import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../shared/guards';
import { RolesGuardOptions } from '../shared/decorators';

import { USER_ROLE } from './enums';
import { AuthUser } from '../shared/decorators/auth-user.decorator';
import { IAuthUser } from '../authorization/interfaces';

@Resolver('Users')
@UseGuards(RolesGuard)
export class UsersResolver {

    constructor(private readonly usersService: UsersService) { }

    @Query('getUsers')
    @RolesGuardOptions({ roles: [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.COMPANY] })
    async getUsers(@AuthUser() authUser: IAuthUser): Promise<IUser[]> {
        const users = await this.usersService.getUsers(authUser);
        return users;
    }

    @Mutation('createUser')
    @RolesGuardOptions({ roles: [USER_ROLE.SUPER_ADMIN, USER_ROLE.COMPANY] })
    async createUser(@Args('createUserInput') dto: CreateUserDto, @AuthUser() authUser: IAuthUser): Promise<Boolean> {
        const user = await this.usersService.createUser(dto, authUser);
        return user == null;
    }

    @Mutation('updateUser')
    @RolesGuardOptions({ roles: [USER_ROLE.SUPER_ADMIN, USER_ROLE.COMPANY] })
    async updateUser(@Args('updateUserInput') dto: UpdateUserDto): Promise<Boolean> {
        const { _id, ...rest } = dto;
        const user = await this.usersService.updateUser(_id, rest as UpdateUserDto);
        return user == null;
    }

    @Mutation('deleteUser')
    @RolesGuardOptions({ roles: [USER_ROLE.SUPER_ADMIN, USER_ROLE.COMPANY] })
    async deleteUser(@Args('deleteUserInput') dto: ByIdDto): Promise<Boolean> {
        const user = await this.usersService.deleteUser(dto._id);
        return user == null;
    }

}
