
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { IAuthUser } from '../../authorization/interfaces';
import { RolesGuardInput } from '../decorators';
import { UsersService } from '../../users/users.service';

import { JWT_SECRET_TOKEN } from '../constants';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {

    jwtService: JwtService;

    constructor(private reflector: Reflector, private usersService: UsersService) {
        this.jwtService = new JwtService({ publicKey: 'jwt', secret: JWT_SECRET_TOKEN });
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rolesGuardConfig = this.reflector.get<RolesGuardInput>('RolesGuardOptions', context.getHandler());
        if (rolesGuardConfig) {
            const { user, token } = await this.getUserFromContext(context);
            await this.checkUserSession(user, token);
            if (!rolesGuardConfig.roles.includes(user.role)) throw new ForbiddenException(`You don't have the necessary permissions`);
            GqlExecutionContext.create(context).getContext().user = user;
        }
        return true;
    }

    private async getUserFromContext(context: ExecutionContext): Promise<{ user: IAuthUser, token: string }> {
        let user: IAuthUser, token: string = null;
        const ctx = GqlExecutionContext.create(context).getContext();
        token = ctx?.req?.headers?.authorization ?? ''
        user = await this.jwtService.verifyAsync(token).catch(() => { throw new UnauthorizedException('Unauthorized') });
        if (!token || !user) throw new UnauthorizedException('Unauthorized');
        return { user, token };
    }

    private async checkUserSession(authUser: IAuthUser, token: string): Promise<void> {
        const refreshToken = await this.usersService.getUserResetToken(authUser._id);
        if (refreshToken !== token) throw new UnauthorizedException('Session expired');
        await this.usersService.getUserAvailability(authUser._id);
    }

}