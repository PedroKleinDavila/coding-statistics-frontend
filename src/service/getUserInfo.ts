import type { UserInfo } from "../types";
import { api } from "./api";

export async function getUserInfo(email: string): Promise<UserInfo | null> {
    try {
        const response = await api.get(`/user/${email}`);
        if (response.status === 200) {
            return response.data.response;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}
