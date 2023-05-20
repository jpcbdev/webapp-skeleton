import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { REGEX_USERNAME_PASSWORD_PATTERN } from '../../shared/constants';
import { USER_ROLE } from '../../users/enums';

export class SignUpDto {

    @IsEmail({})
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(REGEX_USERNAME_PASSWORD_PATTERN)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Matches(REGEX_USERNAME_PASSWORD_PATTERN)
    password: string;

    role?: USER_ROLE;
    active?: boolean;
    confirm?: boolean;
    identity?: boolean;
    salt?: string;

}
