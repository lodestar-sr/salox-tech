import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import helmet from 'helmet';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

import { CorsConfig, NestConfig, SwaggerConfig } from '@/config/configuration';

import { AppModule } from './app.module';
import { ImportsService } from './imports/imports.service';
import metadata from './metadata';

dayjs.extend(duration);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  app.enableShutdownHooks();

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  const importsService = app.get(ImportsService);
  await importsService.importAll();

  // Swagger Api
  if (swaggerConfig.enabled) {
    await SwaggerModule.loadPluginMetadata(metadata);
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path, app, document);
  }

  app.use(helmet());

  // Cors
  if (corsConfig.enabled) {
    app.enableCors({ origin: corsConfig.origin });
  }

  await app.listen(nestConfig.port);
}
bootstrap();
