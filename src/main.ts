import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

const opts = {
  customSiteTitle: 'Zavod REST API DOCS',
  customfavIcon:
    'https://avatars.githubusercontent.com/u/42734308?s=400&u=8343dfa9b3c5a391e40620e5bed713e2cd3816a4&v=4',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
  ],
  customCssUrl: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  ],
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://testing-social-restapi.vercel.app/',
    ],
    // preflightContinue: true,
    // optionsSuccessStatus: 204,
    // methods: ['GET,POST,OPTIONS,DELETE,PUT,PATCH'],
    // origin: [
    //   /^(.*)/,
    // ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
  })

  app.setGlobalPrefix('api')
  app.use(cookieParser(process.env.SECRET))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Zavod')
    .setDescription('The Zavod API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Post')
    .addTag('Photo')
    .addTag('Comment')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document, opts)

  await app.listen(2000)
}
bootstrap()
// {
//   cors: {
//     origin: [
//       'http://localhost:3000',
//       'http://localhost',
//       /http:\/\/localhost*/,
//     ],
//     credentials: true,
//     allowedHeaders: [
//       'Access-Control-Allow-Origin',
//       'Content-Type',
//       'Authorization',
//       'Origin',
//       'Accept',
//     ],
//     methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
//   },
// }
