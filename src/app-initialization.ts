import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { dataSource } from './data-source/postgresql.datasouce';
import { CreateRoles } from './migrations/1add-roles.migration';
import { AppConfigService } from './shared/services/app-configs.service';
import { SharedModule } from './shared/shared.module';

export class AppInitialization {
  private app: INestApplication;
  private configService: AppConfigService;
  async bootstrap(): Promise<void> {
    this.app = await NestFactory.create(AppModule);
    this.configService = this.app.select(SharedModule).get(AppConfigService);
    ConfigModule.forRoot({
      envFilePath: '.env.devlopment',
      isGlobal: true,
    });
    this.setup();
    this.migrations();
    await this.app.listen(3000);
  }
  migrations() {
    dataSource
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized successfully.');
        new CreateRoles().up(dataSource.createQueryRunner('master'));
      })
      .catch((err) => {
        console.error('Error during Data Source initialization:', err);
      });
  }
  setupSwagger(app: INestApplication): void {
    const documentBuilder = new DocumentBuilder()
      .setTitle('API')
      .setDescription(
        `### REST

        Routes is following REST standard (Richardson level 3)

        <details><summary>Detailed specification</summary>
        <p>

        **List:**
          - \`GET /<resources>/\`
            - Get the list of **<resources>** as admin
          - \`GET /user/<user_id>/<resources>/\`
            - Get the list of **<resources>** for a given **<user_id>**
            - Output a **403** if logged user is not **<user_id>**

        **Detail:**
          - \`GET /<resources>/<resource_id>\`
            - Get the detail for **<resources>** of id **<resource_id>**
            - Output a **404** if not found
          - \`GET /user/<user_id>/<resources>/<resource_id>\`
            - Get the list of **<resources>** for a given **user_id**
            - Output a **404** if not found
            - Output a **403** if:
              - Logged user is not **<user_id>**
              - The **<user_id>** have no access to **<resource_id>**

        **Creation / Edition / Replacement / Suppression:**
          - \`<METHOD>\` is:
            - **POST** for creation
            - **PATCH** for update (one or more fields)
            - **PUT** for replacement (all fields, not used)
            - **DELETE** for suppression (all fields, not used)
          - \`<METHOD> /<resources>/<resource_id>\`
            - Create **<resources>** with id **<resource_id>** as admin
            - Output a **400** if **<resource_id>** conflicts with existing **<resources>**
          - \`<METHOD> /user/<user_id>/<resources>/<resource_id>\`
            - Create **<resources>** with id **<resource_id>** as a given **user_id**
            - Output a **409** if **<resource_id>** conflicts with existing **<resources>**
            - Output a **403** if:
              - Logged user is not **<user_id>**
              - The **<user_id>** have no access to **<resource_id>**
        </p>
        </details>`,
      )
      .addBearerAuth();

    if (process.env.API_VERSION) {
      documentBuilder.setVersion(process.env.API_VERSION);
    }

    const document = SwaggerModule.createDocument(app, documentBuilder.build());
    SwaggerModule.setup('documentation', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    console.info(
      `Documentation: http://localhost:${process.env.PORT}/documentation`,
    );
  }
  setup() {
    this.app.use(cookieParser());
    this.app.enableCors({
      origin: this.configService.frontEndUrl,
      credentials: true,
    });

    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
        forbidUnknownValues: true,
      }),
    );

    if (this.configService.enableDocuments) {
      this.setupSwagger(this.app);
    }
  }
}
