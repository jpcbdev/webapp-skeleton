import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { IAuthUser } from '../../authorization/interfaces';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator((data, ctx: ExecutionContext): IAuthUser => {
    const user = GqlExecutionContext.create(ctx).getContext().user as IAuthUser ?? null;
    if (!user) throw new UnauthorizedException('User not found in context');
    return user;
});
