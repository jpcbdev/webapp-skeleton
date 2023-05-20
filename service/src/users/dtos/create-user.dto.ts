import { IsString, IsNotEmpty, IsEmail, IsEnum, Length, Matches } from 'class-validator';
import { REGEX_USERNAME_PASSWORD_PATTERN } from '../../shared/constants';
import { USER_ROLE } from '../../users/enums';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @Length(3, 30,)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 30)
    firstSurname: string;

    @IsString()
    @IsNotEmpty()
    @Matches(REGEX_USERNAME_PASSWORD_PATTERN)
    username: string;

    @IsEmail({})
    @IsNotEmpty()
    email: string;

    @IsEnum([USER_ROLE.ADMIN, USER_ROLE.COMPANY, USER_ROLE.EMPLOYEE])
    @IsNotEmpty()
    role: USER_ROLE;

    password?: string;
    salt?: string;
    active?: boolean;
    confirm?: boolean;
    identity?: boolean;
    createdBy?: string

}
