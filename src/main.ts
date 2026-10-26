import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const appConfig = app.get(ConfigService);

  // Set global prefix for all endpoints
  app.setGlobalPrefix("api");

  // Enable graceful shutdown hooks
  app.enableShutdownHooks();

  // Parse signed/unsigned cookies for JWT extraction fallback
  app.use(cookieParser());

  // Enable CORS. A wildcard origin cannot be combined with credentials: true,
  // so credentials are only enabled when an explicit origin is configured.
  const corsOrigin = appConfig.get<string>("CORS_ORIGIN");
  app.enableCors({
    origin: corsOrigin ? corsOrigin.split(",") : "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: !!corsOrigin,
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global Exceptions Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global Interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle("Danain REST API Boilerplate")
    .setDescription(
      "Boilerplate documentation for authentication and user CRUD APIs",
    )
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, {
    useGlobalPrefix: true,
  });

  const port = appConfig.get<number>("PORT") || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(
    `Swagger documentation available at: http://localhost:${port}/api/docs`,
  );
}

bootstrap().catch((err) => {
  new Logger("Bootstrap").error("Failed to start the application", err);
  process.exit(1);
});
