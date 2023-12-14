import React,{useState,useRef,useEffect} from 'react'
import InputEmoji from "react-input-emoji";
import Avatar from "../components/Avatar"
import SendIcon from "@mui/icons-material/Send";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
 import { format } from "timeago.js";
import { sendMessage,fetchMessagesForChatRoom } from '../apiCalls/chatApi';

const ChatRoom = () => {
  let scroll = useRef(null);
  let socket = useRef();
  let [sendText, setSendText] = useState(null);
  let [receiveMessage, setReceiveMessage] = useState(null);
  let [text, setText] = useState("");
  let [chatMsgs, setChatMsgs] = useState([]);
  let [onlineUsers, setOnlineUsers] = useState([]);
  let state = useSelector(state => state.ThemeReducer);
  let connect = useSelector((state) => state.ChatRoomReducer.connect);
  let NavigateTo = useNavigate();

  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
 
  // establish connection with socket server
  useEffect(() => {
    if (localStorage.getItem("chatToken")) {
      socketCalls();
    }
  }, [connect.id]);


  // fetch latest online users
  useEffect(() => {
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

  }, [onlineUsers])
  
  // send message to socket server
  useEffect(() => {
    if (sendText !== null) {
      socket.current.emit("send-message", sendText);
      
    }
  }, [sendText])
 
  // receive message from socket server
  useEffect(() => {

    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data)
    })
    
    if (receiveMessage !== null) {
      setChatMsgs([...chatMsgs, receiveMessage])
    }
  }, [receiveMessage])
  
  // fetch messages for a chat room
  useEffect(() => {
    if (localStorage.getItem("chatToken")) {
      fetchMessages(connect.chatRoomId)
    } else {
      setChatMsgs(msgs)
    }
  }, [connect.id,connect._id])
  
// scroll to latest message
  useEffect(() => {
    scrollToLatestMsg();

  }, [chatMsgs]);

  let socketCalls = () => {

    socket.current = io("https://socket-connection-07ep.onrender.com");
    socket.current.emit("new-user", loggedUser?._id);  
  };

 let fetchMessages = (id) => {
   fetchMessagesForChatRoom(id)
     .then((res) => {
       setChatMsgs(res.data);
     })
     .catch((err) => {
       console.log(err);
     });
 };
  
  let scrollToLatestMsg = () => {

    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  let handleOnEnter = () => {
    if (text == "") {
      return
    }

    let temp = {
      senderId: JSON.parse(localStorage.getItem("LoggedUser"))?._id,
      receiver: [connect.id || connect._id],
      msg: text
    }
  
    sendMessage(temp).then(res => {
      // fetchMessages(connect.chatRoomId)
      temp.createdAt = Date.now();
      setChatMsgs([...chatMsgs, temp]);
      setSendText(temp);
    }).catch(err => console.log(err));
    
    
  };


  return (
    <div
      style={{
        backgroundImage: "url(/chat-room-theme.jpg)",
        backgroundSize: "cover",
        height: "99vh",
        position: "relative",
      }}
    >
      {/* header part */}
      <div
        style={{ backgroundColor: "lightGreen", position: "sticky", top: 0 }}
        className="p-2 shadow-lg"
      >
        <div className="d-flex align-items-center ">
          <KeyboardBackspaceIcon
            onClick={() => NavigateTo("/Home")}
            className=" mx-1 fs-6 text-secondary"
          />
          <Avatar img={connect.userImg} dim={40} />
          <div className="mx-2">
            <div>
              <span>
                {" "}
                {connect.savedAs || connect.mobile || connect.unknown}
              </span>
              <h6 style={{ fontSize: "13px", fontWeight: "bold" }}>
                {onlineUsers.find(
                  (user) => user.userId == (connect.id || connect._id)
                )
                  ? "online"
                  : `offline`}
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* // chat container */}

      <div
        style={{
          overflowY: "scroll",
          height: "83%",
          backgroundColor: state.backgroundColor,
          color: state.color,
        }}
      >
        {chatMsgs.length > 0 ? (
          <>
            {chatMsgs.map((chat, i) => (
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    chat.senderId == loggedUser?._id ? "end" : "start",
                }}
                className="m-3"
                ref={scroll}
                key={i}
              >
                <div style={{ maxWidth: "70%" }}>
                  {/* <h6  >{chat.id ==
                "other" ? connect.name||connect.mobile : "You"}</h6> */}

                  <div
                    style={{
                      background:
                        chat.senderId == loggedUser?._id
                          ? "rgb(128, 128, 216)"
                          : "violet",
                      borderRadius:
                        chat.senderId == loggedUser?._id
                          ? "1em 1em 0em"
                          : "0em 1em 1em",
                      position: "relative",
                    }}
                    className="p-2 "
                  >
                    <span>{chat.msg}</span>

                    <div
                      style={{
                        fontSize: "10px",
                        display: "flex",
                        justifyContent: "end",
                        color: "rgb(38,48,93)",
                      }}
                    >
                      <span>
                        {new Date(chat.createdAt).getHours() >= 12
                          ? `${
                              new Date(chat.createdAt).getHours() - 12
                            }:${new Date(chat.createdAt).getMinutes()} pm`
                          : `${new Date(chat.createdAt).getHours()}:${new Date(
                              chat.createdAt
                            ).getMinutes()} am`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
           
          </>
        ) : (
          <div className="h-100 d-flex align-items-center justify-content-center p-2">
            <p className=" fst-italic text-secondary ">
              Start Your conversation with smile
            </p>
          </div>
        )}
      </div>

      {/* type input msg */}
      <div
        style={{ background: state.backgroundColor }}
        className="d-flex  align-items-center p-2  w-100 position-sticky bottom-0"
      >
        <button className="btn bg-white shadow-lg">+</button>
        <InputEmoji
          value={text}
          onChange={setText}
          borderColor="lightBlue"
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message ....."
        />

        <button
          data-toggle
          title="send"
          className="btn btn-warning text-white h-50 "
          onClick={() => {
              handleOnEnter();
              setText("");
            }}
        >
          <SendIcon
           
          />
        </button>
      </div>
    </div>
  );
}

export default ChatRoom