import axios from "axios"

let axiosInstance = axios.create({
    baseURL: "https://chit-chat-app-tqgu.onrender.com"
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("chatToken");
        
        if (token) {
            config.headers["x-access-token"] = token
        }
        return config;
    },
    (error) => {
        console.log("error: " + error)
        return Promise.reject(error);
    }
);

export default axiosInstance;