import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import serverlessExpress from "@vendia/serverless-express";
import express from "express";
import { ExpressAdapter } from "@nestjs/platform-express";

let cachedNestApplication: any = null;

export async function createApplication() {
    if (cachedNestApplication) {
        return cachedNestApplication;
    }

    const expressApp = express();

    const adapter = new ExpressAdapter(expressApp);
    const nestApplication = await NestFactory.create(AppModule, adapter);

    nestApplication.useGlobalPipes(new ValidationPipe());

    await nestApplication.init();

    const application = nestApplication.getHttpAdapter().getInstance();
    cachedNestApplication = serverlessExpress({ app: application });

    return cachedNestApplication;
}