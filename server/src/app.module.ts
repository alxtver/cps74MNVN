import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApkziModule } from './apkzi/apkzi.module';
import { MongooseModule } from '@nestjs/mongoose';
import { url } from './config';
import { AuthMiddleware } from './middleware/auth.middleware';
import { routes } from './app.routes';
import { SystemCasesModule } from './system-cases/system-cases.module';
import { EanModule } from './ean/ean.module';
import { ResponseVariablesMiddleware } from './middleware/responseVariables.middleware';
import { AuthModule } from './auth/auth.module';
import { PkiModule } from './pki/pki.module';
import { PartModule } from './part/part.module';
import { PcModule } from './pc/pc.module';
import { CountryModule } from './country/country.module';
import * as mongoose from 'mongoose';

mongoose.set('returnOriginal', false);
@Module({
  imports: [
    MongooseModule.forRoot(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    PkiModule,
    PartModule,
    AuthModule,
    ResponseVariablesMiddleware,
    EanModule,
    ApkziModule,
    SystemCasesModule,
    PcModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(auth: MiddlewareConsumer) {
    auth
      .apply(AuthMiddleware)
      .exclude('login')
      .forRoutes(...routes);
  }
}
