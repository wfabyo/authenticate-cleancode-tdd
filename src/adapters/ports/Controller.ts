import { HttpResponse } from "../helpers/http-helpers";

export interface Controller<T = any> {
    handle: (request: T) => Promise<HttpResponse>
}