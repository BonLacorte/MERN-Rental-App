import { navigate } from "@/lib/navigation";
import axios from "axios";
import queryClient from "./queryClient";

const options = {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
}

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data)

const API = axios.create(options);

API.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const {config, response} = error;
        const { status, data } = response || {};

        // try to refresh the access token behind the scenes
        if (status === 401 && data.errorCode === "InvalidTokenError") {
            try {
                await TokenRefreshClient.get("/auth/refresh");
                return TokenRefreshClient(config)
            } catch (error) {
                queryClient.clear();
                navigate("/login", {
                    state: {
                        redirectUrl: window.location.pathname,
                    }
                })
            }
            // await API.get("/auth/refresh");
            // return API(error.config);
        }

        return Promise.reject({ status, ...data });
    }
);

export default API