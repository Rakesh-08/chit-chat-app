import axiosInstance from "./apiUtils";


let sendMessage = async (obj) => {
    return await axiosInstance.post("/chat-app/chat/message", obj)
}

let getAllChatRooms = async () => {
    return await axiosInstance.get("/chat-app/fetch/chatRooms");
}

let fetchMessagesForChatRoom = async (id) => {
    return await axiosInstance.get(`/chat-app/chatRoom/${id}/messages`);
}

export { sendMessage, getAllChatRooms, fetchMessagesForChatRoom };


