import dotenv from 'dotenv';
import path from 'path';
import { SearchClientRequestBody } from './types/RequestTypes';

dotenv.config({ path: path.resolve(__dirname, './.env') });

const baseUrl = process.env.baseUrl as string
const token = process.env.token as string

/*export const apiConfig = {
    baseUrl,
    token
};*/

//Функция создания url с проверкой и удалением лишних слешей перед endpoint
export function buildLoadUrl(endpoint: string): string {
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');

    const url = new URL(`${normalizedEndpoint}`, baseUrl);

    url.searchParams.set('h', token);

    return url.toString();
}