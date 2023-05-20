import { IsString, IsNotEmpty, Length } from 'class-validator';

export class SigningDto {

    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    searchCriteria: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    password: string;

}