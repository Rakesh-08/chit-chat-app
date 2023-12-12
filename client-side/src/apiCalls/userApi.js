import axiosInstance from "./apiUtils"

let addContactCall = async (obj) => {
    return await axiosInstance.put("/chat-app/newContact", obj)
}

let getContactCall = async () => {
    return await axiosInstance.get("/chat-app/contacts");
}

let updateUserCall = async (obj) => {
    return await axiosInstance.put("/chat-app/user/update", obj);
}

let uploadImg = async (data) => {
    return await axiosInstance.put("/chat-app/profilePicture/upload", data);
}

let getUser = async (id) => {
    return await axiosInstance.get("/chat-app/user/"+id)
}

export { addContactCall,getContactCall,updateUserCall,uploadImg,getUser }