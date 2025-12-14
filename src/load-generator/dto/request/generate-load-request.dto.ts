import { IsNumber, IsString } from "class-validator";

export class GenerateLoadRequestDto {
    @IsString()
    readonly targetUrl: string;

    @IsNumber()
    readonly requestsNumber: number;

    @IsNumber()
    readonly concurrency: number;
}