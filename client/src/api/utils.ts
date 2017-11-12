declare var baseUrl: string;

export function url(href: string) {
    return `${location.protocol}//${baseUrl}${href}`;
}

export interface ResponseWrapper<T> {
    readonly message: string;
    readonly okay: boolean;
    readonly data: T;
}

export async function parseApi<T>(unresolvedResponse: Promise<Response>): Promise<T> {
    let response: Response;
    try {
        response = await unresolvedResponse;
    } catch(err) {
        // TODO: Handle connection error.
        console.error(err);
        throw new Error("Unable to connect to the backend.");
    }
    if (response.status < 200 || response.status >= 300) {
        // TODO: Handle bad status code.
        throw new Error(`Bad status code ${response.status}.`);
    }
    let json: T;
    try {
        json = await response.json();
    } catch(err) {
        // TODO: Handle parse error.
        console.error(err);
        throw new Error("Unable to parse response.");
    }
    return json;
}
