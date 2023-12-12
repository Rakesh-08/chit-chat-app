import React,{useState,useRef,useEffect} from 'react'
import InputEmoji from "react-input-emoji";
import Avatar from "../components/Avatar"
import SendIcon from "@mui/icons-material/Send";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
import { sendMessage,fetchMessagesForChatRoom } from '../apiCalls/chatApi';

const ChatRoom = () => {
  let [latestMsgRef, setLatestMsgRef] = useState(null);
  // let socket = useRef();
  let [text, setText] = useState("");
  let [chatMsgs, setChatMsgs] = useState([]);
  let [onlineUsers,setOnlineUsers]=useState([]);
  let state = useSelector(state => state.ThemeReducer);
  let connect = useSelector((state) => state.ChatRoomReducer.connect);
  let NavigateTo = useNavigate();


let loggedUser= JSON.parse(localStorage.getItem("LoggedUser"));

  useEffect(() => {

    if (localStorage.getItem("chatToken")) {
           socketCalls   
    }
  }, [connect.id])
  
  useEffect(() => {
    scrollToLatestMsg();
    if (localStorage.getItem("chatToken")) {
         fetchMessages(connect.chatRoomId)
    } else {
      setChatMsgs(msgs)
    }
  }, [connect.id,latestMsgRef])
  
  let socketCalls = () => {

    // socket.current = io("http://localhost:5050");
    // socket.current.emit("new-user", connect._id);
    // socket.current.on("get-users", (users) => {
    //   setOnlineUsers(users);
    //   console.log(users);
    // });
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

     if (latestMsgRef) {
       latestMsgRef.scrollIntoView({ behavior: "smooth" });
     }
  }

  let handleOnEnter = () => {
    if (text == "") {
      return 
    }

    let temp = {
      senderId: JSON.parse(localStorage.getItem("LoggedUser"))?._id,
      receiver:[connect.id],
      msg:text
    }
  
    sendMessage(temp).then(res => {
          fetchMessages(connect.chatRoomId)
    }).catch(err=>console.log(err));
    
    scrollToLatestMsg();
  }



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
        style={{ background: "lightGreen", position: "sticky", top: 0 }}
        className="p-2 shadow-lg"
      >
        <div className="d-flex align-items-center ">
          <KeyboardBackspaceIcon
            onClick={() => NavigateTo("/Home")}
            className=" mx-1 fs-6 text-secondary"
          />
          <Avatar img={connect.userImg} dim={40} />
          <div className="mx-2">
            <div className="">
              <span> {connect.savedAs || connect.mobile||connect.unknown}</span>
              <h6 style={{ fontSize: "13px", fontWeight: "bold" }}>
                online || offline active 4h ago
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
                  justifyContent: chat.id == loggedUser?._id ? "end" : "start",
                }}
                className="m-3"
                key={i}
              >
                <div style={{ maxWidth: "70%" }}>
                  {/* <h6  >{chat.id ==
                "other" ? connect.name||connect.mobile : "You"}</h6> */}

                  <div
                    style={{
                      background:
                        chat.id == loggedUser?._id ? "rgb(128, 128, 216)" : "violet",
                      borderRadius: "0em 1em 1em",
                      position: "relative",
                    }}
                    className="p-2 "
                  >
                    <span cl>{chat.msg}</span>

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
                          : `${new Date(chat.createdAt).getHours()}:${new Date(chat.createdAt).getMinutes()} am`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <span ref={ref=>setLatestMsgRef(ref)}></span>
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
      <div className="d-flex  align-items-center bg-white p-2  w-100 position-sticky bottom-0">
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
        >
          <SendIcon
            onClick={() => {
              handleOnEnter();
              setText("");
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default ChatRoom