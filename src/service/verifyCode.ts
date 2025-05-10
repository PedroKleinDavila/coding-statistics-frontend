import type { APIError, APIResponse } from "../types";
import { api } from "./api";

export async function verifyCode(email: string, machineId: string, code: string): Promise<APIResponse> {
    try {
        const response = await api.post(`/account/create-user`, {
            email,
            machineId,
            code,
        });
        console.log(response);
        return {
            message: response.data.message,
            ok: true,
        };
    } catch (error) {
        return {
            message: (error as APIError).response.data.message,
            ok: false,
        };
    }
}