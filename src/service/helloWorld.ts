import { api } from "./api";

export async function helloWorld(): Promise<void> {
    const response = await api.get("/");
    console.log(response);
}