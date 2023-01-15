import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const errorMessages = {};
        errors.forEach(error => {
          errorMessages[error.property] = Object.values(error.constraints);
        });
        return new BadRequestException({
          statusCode: 400,
          message: errorMessages,
          error: 'Bad Request'
        });
      },
      whitelist: true
    }),
  );
  (BigInt.prototype as any).toJSON = function () {
    return Number(this)
  };
  await app.listen(3000);
}
bootstrap();
