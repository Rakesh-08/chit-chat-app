import axios from "axios"

let axiosInstance = axios.create({
    baseURL: "http://localhost:8099"
});


export default axiosInstance;