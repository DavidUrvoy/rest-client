import {HttpMethod} from "./HttpMethod";

export interface HttpRequest {
    url: string,
    method: HttpMethod,
    body?: string,
    headers: Map<string, string>
}

export const EMPTY_REQUEST: HttpRequest = {
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    method: HttpMethod.GET,
    headers: new Map
}
