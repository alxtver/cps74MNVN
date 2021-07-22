import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';
import {config} from './config';
import {PkiModule} from './pki/pki.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.url, { useNewUrlParser: true }),
    CustomerModule, PkiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
