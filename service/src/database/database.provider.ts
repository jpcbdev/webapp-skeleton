import * as mongoose from 'mongoose';
import { DATABASE_PROVIDE } from '../shared/constants';
import { InternalServerErrorException, Logger, Provider } from '@nestjs/common';

export const dataBaseProviders: Provider[] = [
    {
        provide: DATABASE_PROVIDE,
        useFactory: async (): Promise<any> => await mongoose
            .connect(`${'mongodb://localhost/webapp-skeleton'}`, {
                useNewUrlParser: true
            } as any).catch(error => {
                Logger.error(`[DATABASE] Mongoose connection Error: ${error?.message}`)
                throw new InternalServerErrorException(error?.message);
            })
    }
]