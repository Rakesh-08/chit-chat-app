import axios from "axios"
"https://chit-chat-app-tqgu.onrender.com"
let axiosInstance = axios.create({
    baseURL:"http://localhost:8099"
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