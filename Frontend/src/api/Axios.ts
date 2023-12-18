import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.VITE_CLIENT_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }
})