import {HttpMethod} from "./HttpMethod";

export default interface HttpRequest {
    url: string, method: HttpMethod,
    body?: string,
    headers: Map<string, string>
}
