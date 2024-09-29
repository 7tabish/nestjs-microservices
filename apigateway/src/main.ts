import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './utils/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //apply middleware globaly
  app.use(new LoggerMiddleware().use);
  await app.listen(3000);
}
bootstrap();
