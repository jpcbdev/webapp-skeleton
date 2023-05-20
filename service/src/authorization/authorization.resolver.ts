import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SigningDto } from './dtos';
import { AuthorizationService } from './authorization.service';

import { IAccess } from './interfaces';

@Resolver('Auth')
export class AuthorizationResolver {

    constructor(private readonly authorizationService: AuthorizationService) { }
    @Mutation('signing')
    async signing(@Args('signingInput') dto: SigningDto): Promise<IAccess> {
        const access = await this.authorizationService.signing(dto);
        return access;
    }

}
