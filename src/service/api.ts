import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});