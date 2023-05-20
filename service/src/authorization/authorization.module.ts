import { Module } from '@nestjs/common';
import { AuthorizationResolver } from './authorization.resolver';
import { AuthorizationService } from './authorization.service';

import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JWT_SECRET_TOKEN } from '../shared/constants';
import { JwtStrategy } from './jwt-strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: JWT_SECRET_TOKEN,
            signOptions: {
                expiresIn: '1d'
            }
        }),
        UsersModule
    ],
    providers: [AuthorizationResolver, AuthorizationService, JwtStrategy],
    exports: [AuthorizationService, PassportModule, JwtStrategy]
})
export class AuthorizationModule { }
