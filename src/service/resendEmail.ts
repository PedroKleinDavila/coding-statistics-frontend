import type { APIError, APIResponse } from "../types";
import { api } from "./api";

export async function resendEmail(email: string): Promise<APIResponse> {
    try {
        const response = await api.patch(`/account/resend-code/${email}`);
        return {
            message: response.data.message,
            ok: true,
        };
    } catch (error) {
        const typedError = error as APIError;
        return {
            message: typedError.response.data.message,
            ok: false,
        };
    }
}