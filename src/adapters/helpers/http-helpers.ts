export interface HttpRequest {
    body?: any
}

export type HttpResponse = {
    statusCode: number
    body: any
}

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const ok = (object: any) : HttpResponse => ({
    statusCode: 200,
    body: object
})