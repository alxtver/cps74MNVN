import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as ConnectMongoDBSession from 'connect-mongodb-session';
import { config } from './config';
import * as csrf from 'csurf';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

async function startApp() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const MongoStore = ConnectMongoDBSession(session);
  const store = new MongoStore({
    collection: 'sessions',
    uri: config.url,
  });

  app.use(
    session({
      secret: config.secretKey,
      resave: false,
      saveUninitialized: false,
      store,
    }),
  );

  // app.use(csrf());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());

  await app.listen(3001);
}
startApp();
