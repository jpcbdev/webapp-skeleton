import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { SERVICE_ENV } from './shared/constants';
import { UsersModule } from './users/users.module';

import { DatabaseModule } from './database/database.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ENV } from './shared/enums';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      playground: SERVICE_ENV === ENV.DEV,
      csrfPrevention: true,
      includeStacktraceInErrorResponses: false,
      introspection: SERVICE_ENV === ENV.DEV,
      allowBatchedHttpRequests: false
    }),
    DatabaseModule,
    UsersModule,
    AuthorizationModule,
  ],
  controllers: [],
})
export class AppModule { }
