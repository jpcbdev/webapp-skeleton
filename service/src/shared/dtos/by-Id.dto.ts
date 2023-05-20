
import { IsMongoId, IsNotEmpty } from 'class-validator';

const idEmptyErrorMessage = 'El campo ID no debe ser vació';
const idTypeErrorMessage = 'El campo ID no es un tipo válido';

export class ByIdDto {
    @IsMongoId({ message: idTypeErrorMessage })
    @IsNotEmpty({ message: idEmptyErrorMessage })
    _id: string;
}