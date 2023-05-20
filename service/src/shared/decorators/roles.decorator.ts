import { SetMetadata } from '@nestjs/common';
import { USER_ROLE } from '../../users/enums';
import { ROLES_KEY } from '../../shared/constants';

export const Roles = (...roles: USER_ROLE[]) => SetMetadata(ROLES_KEY, roles);