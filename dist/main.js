"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const opts = {
    customSiteTitle: 'Zavod REST API DOCS',
    customfavIcon: 'https://avatars.githubusercontent.com/u/42734308?s=400&u=8343dfa9b3c5a391e40620e5bed713e2cd3816a4&v=4',
    customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: function (origin, callback) {
            console.log('allowed cors for:', origin);
            callback(null, true);
        },
        allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
        methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.use(cookieParser(process.env.SECRET));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Zavod')
        .setDescription('The Zavod API description')
        .setVersion('1.0')
        .addTag('Auth')
        .addTag('User')
        .addTag('Post')
        .addTag('Photo')
        .addTag('Comment')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document, opts);
    await app.listen(2000);
}
bootstrap();
//# sourceMappingURL=main.js.map