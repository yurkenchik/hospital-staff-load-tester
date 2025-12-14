import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const nestLoadTestingApplication = await NestFactory.create(AppModule);

    nestLoadTestingApplication.setGlobalPrefix('/api');
    nestLoadTestingApplication.enableCors();

    const configService = nestLoadTestingApplication.get(ConfigService);
    const PORT = configService.get<number>('PORT') || 7777;
    const applicationLogger = new Logger('ApplicationLauncher');

    await nestLoadTestingApplication.listen(PORT, () => applicationLogger.log({ port: PORT }, 'Server is running'));
}
bootstrap();