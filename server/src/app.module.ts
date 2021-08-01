import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApkziModule } from './apkzi/apkzi.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { AuthMiddleware } from './middleware/auth.middleware';
import { routes } from './app.routes';
import { SystemCasesModule } from './system-cases/system-cases.module';
import { EanModule } from './ean/ean.module';
import { ResponseVariablesMiddleware } from './middleware/responseVariables.middleware';
import { AuthModule } from './auth/auth.module';
import { PkiModule } from './pki/pki.module';
import { PartModule } from './part/part.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.url, {
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...routes);
  }
}
