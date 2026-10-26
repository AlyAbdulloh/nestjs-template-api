import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "./../src/app.module";
import { DanainPrismaService } from "./../src/prisma/danain/danain-prisma.service";
import { TransformInterceptor } from "./../src/common/interceptors/transform.interceptor";

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    process.env.JWT_SECRET = "e2e-test-secret";

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DanainPrismaService)
      .useValue({ user: {}, $connect: jest.fn(), $disconnect: jest.fn() })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api");
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /api/health returns a healthy status", () => {
    return request(app.getHttpServer())
      .get("/api/health")
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.statusCode).toBe(200);
        expect(res.body.data.status).toBe("ok");
      });
  });
});
