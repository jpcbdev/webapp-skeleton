import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

import { UsersRepository } from './users.repository';
import { DatabaseModule } from '../database/database.module';
import { UserProvider } from './providers';

import { USER_ROLE } from './enums';

@Module({
  imports: [DatabaseModule],
  providers: [UsersResolver, UsersService, UsersRepository, ...UserProvider],
  exports: [UsersService, UsersRepository]
})
export class UsersModule implements OnModuleInit {

  constructor(private readonly usersRepository: UsersRepository, private readonly userService: UsersService) { }

  async onModuleInit() {
    if (!(await this.usersRepository.getUser({ role: USER_ROLE.SUPER_ADMIN }))) await this.createSuperAdmin();
  }

  async createSuperAdmin(): Promise<void> {
    await this.userService.createUser({
      name: 'master',
      firstSurname: 'master',
      username: 'master',
      password: 'master',
      email: 'master@admin.com',
      role: USER_ROLE.SUPER_ADMIN,
      confirm: true,
    });
    Logger.log(`[USERS MODULE] Super admin user created`);
  }

}