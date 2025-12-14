export class GenerateLoadResponseDto {
    readonly duration: number;
    readonly successfulRequests: number;
    readonly failedRequests: number;
    readonly requestsPerSecond: number;
}