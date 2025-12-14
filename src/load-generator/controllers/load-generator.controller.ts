import { Body, Controller, Post } from '@nestjs/common';
import { GenerateLoadResponseDto } from '../dto/response/generate-load-response.dto';
import { GenerateLoadRequestDto } from '../dto/request/generate-load-request.dto';
import { LoadGeneratorService } from '../services/load-generator.service';

@Controller('load-generator')
export class LoadGeneratorController {
    constructor(private readonly loadGeneratorService: LoadGeneratorService) {}

    @Post()
    async generateLoad(@Body() generateLoadRequestDto: GenerateLoadRequestDto): Promise<GenerateLoadResponseDto> {
        return this.loadGeneratorService.generateLoad(generateLoadRequestDto);
    }
}