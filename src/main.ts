import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Configurations 
  app.setGlobalPrefix('/api/integrations/orders/v1');
  app.enableCors();
  app.set('trust proxy', 1);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  await app.listen(app.get(ConfigService).get('port'));
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
