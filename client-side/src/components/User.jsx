import React,{useEffect,useState} from 'react'
import Avatar from './Avatar';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { fetchMessagesForChatRoom } from '../apiCalls/chatApi';
import { getUser } from "../apiCalls/userApi";


const User = ({ chatRoomId,user,senderId }) => {
  let dispatch = useDispatch();
  let NavigateTo = useNavigate();
  let [unknown,setUnknown]=useState("Unknown")
  let [messages,setMessaages] = useState([])
 
  
  useEffect(() => {
    fetchMessages(chatRoomId);
      
    if (!user) {
         getUser(senderId).then(res => {
            setUnknown(res.data.mobile) 
           
         })
           .catch(err =>
             console.log(err));
                     }
  }, []);


  let fetchMessages = (id) => {
    fetchMessagesForChatRoom(id)
      .then((res) => {
        setMessaages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        dispatch({
          type: "changeChatRoom",
          payload:{...user,chatRoomId:chatRoomId,unknown:unknown},
        });

        if (window.innerWidth <= 600) {
          NavigateTo("/chat-room");
        }
      }}
      className="d-flex py-3 mx-1"
    >
      <Avatar img={user?.userImg} dim={45} />

      <div className="w-100 mx-2">
        <div className="d-flex justify-content-between">
          <span className="fw-bold">{user?.savedAs || user?.mobile||unknown}</span>
          <span style={{ fontSize: "12px", color: "darkOrange" }}>{format(messages[messages.length-1]?.createdAt)}</span>
        </div>
        <div style={{ fontSize: "14px", color: "rgb(94,94,88)" }}>
          {messages[messages.length - 1]?.msg?.length > 40
            ? `${messages[messages.length - 1]?.msg.slice(0, 40)}.....`
            : messages[messages.length - 1]?.msg}
        </div>
      </div>
    </div>
  );
}

export default User