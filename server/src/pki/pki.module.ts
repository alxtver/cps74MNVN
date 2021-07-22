import { Module } from '@nestjs/common';
import { PkiController } from './pki.controller';
import { PkiService } from './pki.service';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD
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
=======
import { pkiSchema } from './schemas/pki.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Pki', schema: pkiSchema }]),
>>>>>>> 5e42e39... first commit
    ],
    controllers: [PkiController],
    providers: [PkiService],
})
<<<<<<< HEAD
export class PkiModule {}
=======
export class PkiModule { }
>>>>>>> 5e42e39... first commit
