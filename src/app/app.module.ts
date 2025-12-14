import { Module } from '@nestjs/common';
import { LoadGeneratorModule } from '../load-generator/load-generator.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        LoadGeneratorModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
