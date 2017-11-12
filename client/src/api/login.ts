import { parseApi, url } from "./utils";

export interface LoginResult {
    readonly token: string;
}

export async function login(username: string, password: string): Promise<LoginResult> {
    const params = {
        body: JSON.stringify({ username, password }),
        method: "POST"
    };
    try {
        return await parseApi<LoginResult>(
            fetch(url("/login"), params)
        );
    } catch(err) {
        // TODO: Handle all errors.
        console.error(err);
        throw err;
    }
}
