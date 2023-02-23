import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.enableCors()
  app.use(cookieParser(process.env.SECRET))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(2000)
}
bootstrap()
