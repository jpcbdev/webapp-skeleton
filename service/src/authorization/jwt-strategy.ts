import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JWT_SECRET_TOKEN } from '../shared/constants';
import { IAuthUser } from './interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() { super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET_TOKEN }) }
    validate(authUser: IAuthUser): IAuthUser {
        if (!authUser) throw new UnauthorizedException('Unauthorized');
        return authUser;
    }
}