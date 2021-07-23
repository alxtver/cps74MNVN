import { Module } from '@nestjs/common';
import { PkiController } from './pki.controller';
import { PkiService } from './pki.service';
import { MongooseModule } from '@nestjs/mongoose';
import { pkiSchema } from '../schemas/pki.schema';
import { userSchema } from '../schemas/user.schema';
import { eanSchema } from '../schemas/ean.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Pki', schema: pkiSchema },
            { name: 'User', schema: userSchema },
            { name: 'Ean', schema: eanSchema },
        ]),
    ],
    controllers: [PkiController],
    providers: [PkiService],
})
export class PkiModule {}
