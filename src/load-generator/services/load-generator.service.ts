import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { GenerateLoadResponseDto } from '../dto/response/generate-load-response.dto';
import { GenerateLoadRequestDto } from '../dto/request/generate-load-request.dto';

@Injectable()
export class LoadGeneratorService {
    private readonly logger = new Logger(LoadGeneratorService.name);

    async generateLoad(generateLoadRequestDto: GenerateLoadRequestDto): Promise<GenerateLoadResponseDto> {
        const { targetUrl, requestsNumber, concurrency } = generateLoadRequestDto;

        this.logger.log(`Starting load generation to ${targetUrl}`);
        this.logger.log(`Number of requests: ${requestsNumber}, Concurrency: ${concurrency}`);

        const startTime = Date.now();
        let successfulRequests = 0;
        let failedRequests = 0;

        const requestPromises: Array<Promise<unknown>> = [];

        for (let requestIndex = 0; requestIndex < requestsNumber; requestIndex++) {
            const promise = axios.get(targetUrl)
                .then(response => {
                    if (response.status === 200) {
                        successfulRequests++;
                    } else {
                        failedRequests++;
                        this.logger.warn(`Request failed with status: ${response.status}`);
                    }
                })
                .catch(error => {
                    failedRequests++;
                    this.logger.error(`Request failed: ${error.message}`);
                });
            requestPromises.push(promise);

            if (requestPromises.length >= concurrency) {
                await Promise.race(requestPromises);
                const finishedIndex = await Promise.race(requestPromises.map((promise, index) => promise.then(() => index)));
                requestPromises.splice(finishedIndex, 1);
            }
        }

        await Promise.all(requestPromises);

        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        const requestsPerSecond = requestsNumber / duration;

        return { successfulRequests, failedRequests, duration, requestsPerSecond  };
    }
}