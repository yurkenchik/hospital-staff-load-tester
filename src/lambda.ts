import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import serverlessExpress from "@vendia/serverless-express";
import { createApplication } from './app/application';

let server: ReturnType<typeof serverlessExpress> | null = null;

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
    if (!server) {
        server = await createApplication();
    }
    return server(event, context);
};