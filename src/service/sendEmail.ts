import type { APIError, APIResponse } from "../types";
import { api } from "./api";

export async function sendEmail(email: string): Promise<APIResponse> {
    try {
        const response = await api.post(`/account/send-code/${email}`)
        return {
            message: response.data.message,
            ok: true,
        };
    } catch (error) {
        const typedError = error as APIError;
        const response = {
            message: typedError.response.data.message,
            ok: false,
        }
        return response;
    }
}