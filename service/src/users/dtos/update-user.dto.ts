import { IsString, Length, IsOptional } from 'class-validator';
import { ByIdDto } from '../../shared/dtos';

export class UpdateUserDto extends ByIdDto {
    @IsString()
    @IsOptional()
    @Length(3, 30)
    name?: string;

    @IsString()
    @IsOptional()
    @Length(3, 30)
    firstSurname?: string;

    @IsString()
    @IsOptional()
    @Length(3, 30)
    secondSurname?: string;

    image?: string;
    deleted?: boolean;
    refreshToken?: string;
}










