import { SetMetadata } from '@nestjs/common';
import { USER_ROLE } from '../../users/enums';

export class RolesGuardInput {
  roles?: USER_ROLE[]
}

export const RolesGuardOptions = (options: RolesGuardInput) => SetMetadata('RolesGuardOptions', options);


