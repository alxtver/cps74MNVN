import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';
import { config } from './config';
import { PkiModule } from './pki/pki.module';
import { PartModule } from './part/part.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ResponseVariablesMiddleware } from './middleware/responseVariables.middleware';
import { routes } from './app.routes';
import { EanModule } from './ean/ean.module';
import { ApkziModule } from './apkzi/apkzi.module';
import { SystemCasesModule } from './system-cases/system-cases.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    }),
    CustomerModule,
    PkiModule,
    PartModule,
    AuthModule,
    ResponseVariablesMiddleware,
    EanModule,
    ApkziModule,
    SystemCasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware).forRoutes(...routes);
  }
}
