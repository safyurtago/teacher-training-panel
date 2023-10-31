import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.API_PORT || 8000;

  const config = new DocumentBuilder()
    .setTitle('TEACHER TRAINING PANEL example')
    .setDescription('TEACHER TRAINING PANEL API description')
    .setVersion('1.0')
    .addTag('TEACHER TRAINING PANEL')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());


  await app.listen(port, () => {
    console.log("listening on port: " + port);
  });
}
bootstrap();