import axiosInstance from "./apiUtils"

let registerToPlatform = async (obj) => {
    return await axiosInstance.post("/chat-app/register",obj)
}

let loginCall = async (obj) => {
    return await axiosInstance.post("/chat-app/login/verification", obj);
}

export {registerToPlatform,loginCall}