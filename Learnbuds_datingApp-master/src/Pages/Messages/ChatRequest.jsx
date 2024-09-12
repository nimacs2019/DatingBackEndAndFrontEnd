import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});
export const addToChatList = (data) => API.post("/chat/", data);
export const userChats = (id) => API.get(`/chat/${id}`);
export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);

export const getMessages = (id) => API.get(`/message/${id}`);
export const addMessage = (data) => API.post("/message/", data);
