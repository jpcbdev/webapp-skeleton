import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SigningDto } from './dtos';

import { IUser } from '../users/interfaces';
import * as bcrypt from 'bcrypt';

import { REGEX_EMAIL_PATTERN } from '../shared/constants';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../users/dtos';

import { IAccess } from './interfaces';

@Injectable()
export class AuthorizationService {

    private readonly emailPattern = REGEX_EMAIL_PATTERN;

    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService,) { }

    async signing(dto: SigningDto): Promise<IAccess> {
        const conditions = this.emailPattern.test(dto.searchCriteria)
            ? { email: dto.searchCriteria }
            : { username: dto.searchCriteria };
        const user = await this.usersService.getUserByConditions(conditions);
        await this.checkUserAccess(dto, user);
        return { token: (await this.setAuthorizationToken(user)) };
    }

    private async checkUserAccess(dto: SigningDto, user: IUser): Promise<void> {
        const userPrivacy = await this.usersService.getUserPrivacy(user._id);
        if (!dto.password || !userPrivacy.salt || !userPrivacy.password) throw new BadRequestException('User not found');
        const hash = await bcrypt.hash(dto.password, userPrivacy.salt);
        if (hash !== userPrivacy.password) throw new BadRequestException('User not found');
        if (!user.confirm) throw new BadRequestException('User not confirmed');
        if (!user.active) throw new BadRequestException('User blocked');
    }

    private async setAuthorizationToken(user: IUser): Promise<string> {
        const { _id, role, email, name, firstSurname, username, timezone } = user;
        const token = this.jwtService.sign({ _id, role, email, name, firstSurname, username, timezone });
        await this.usersService.updateUser(_id.toString(), { refreshToken: token } as UpdateUserDto);
        return token;
    }

}
