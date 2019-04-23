import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { CustomLogger } from './shared/services/logger.service';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger:  new CustomLogger() });
  app.use(compression());
  await app.listen(3000);
}
bootstrap();
