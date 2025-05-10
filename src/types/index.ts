export type APIError = {
    response: {
        data: {
            message: string;
        };
    };
}

export type APIResponse = {
    message: string;
    ok: boolean;
}