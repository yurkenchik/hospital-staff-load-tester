import { Module } from '@nestjs/common';
import { LoadGeneratorService } from './services/load-generator.service';
import { LoadGeneratorController } from './controllers/load-generator.controller';

@Module({
    providers: [LoadGeneratorService],
    controllers: [LoadGeneratorController],
    exports: [LoadGeneratorService],
})
export class LoadGeneratorModule {}