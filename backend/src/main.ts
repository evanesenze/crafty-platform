import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
        key: fs.readFileSync(__dirname + '/../' + process.env.SSL_KEY_PATH),
        cert: fs.readFileSync(__dirname + '/../' + process.env.SSL_CERT_PATH),
      },
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Crafty Platform REST API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/ui', app, document);

  app.enableCors();
  await app.listen(3001);
}
bootstrap();
