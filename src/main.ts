import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.enableCors()
  app.use(cookieParser(process.env.SECRET))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const config = new DocumentBuilder()
    .setTitle('Zavod')
    .setDescription('The Zavod API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Post')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/api-docs', app, document, {
    customSiteTitle: 'Zavod REST API DOCS',
  })

  await app.listen(2000)
}
bootstrap()
