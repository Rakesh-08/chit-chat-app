import React,{useState,useRef,useEffect} from 'react'
import InputEmoji from "react-input-emoji";
import Avatar from "../components/Avatar"
import SendIcon from "@mui/icons-material/Send";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

let msgs = [
  { id: "other", msg: "some random message" },
  { id: "other", msg: "some random message" },
  { id: "you", msg: "some dummy message from my side as well" },
  { id: "other", msg: "I got your dummy message thank you" },
  { id: "you", msg: "okk buddy , take care of yourself and your family" },
  { id: "other", msg: "some random message" },
  { id: "other", msg: "some random message" },
  { id: "you", msg: "some dummy message from my side as well" },
  { id: "other", msg: "I got your dummy message thank you" },
  { id: "you", msg: "okk buddy , take care of yourself and your family" },
  { id: "other", msg: "some random message" },
  { id: "other", msg: "some random message" },
  { id: "you", msg: "some dummy message from my side as well" },
  { id: "other", msg: "I got your dummy message thank you" },
  { id: "you", msg: "okk buddy , take care of yourself and your family" },
  { id: "you", msg: "hello world how are your" },
];

const ChatRoom = ({ connect }) => {
  let latestMsgRef = useRef();
  let [text, setText] = useState("");
  let state = useSelector(state => state.ThemeReducer);
  let NavigateTo = useNavigate();

  useEffect(() => {
    scrollToLatestMsg();
  }, [connect._id])
  
  let scrollToLatestMsg = () => {
     if (latestMsgRef?.current) {
       latestMsgRef.current.scrollIntoView({ behavior: "smooth" });
     }
  }
  
  let handleOnEnter = () => {
    if (text == "") {
      return 
    }
    
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
      <div style={{ background: "lightGreen" }} className="p-2 shadow-lg">
        <div className="d-flex align-items-center ">
          <KeyboardBackspaceIcon onClick={()=>NavigateTo("/Home")} className=" mx-1 fs-6 text-secondary"/>
          <Avatar img={connect.profilePic} dim={40} />
          <div className="mx-2">
            <div className="">
              <span> {connect.name || connect.mobile}</span>
              <h6 style={{ fontSize: "13px", fontWeight: "bold" }}>
                online || offline active 4h ago
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* // chat container */}

      <div style={{ overflowY: "scroll", height: "83%",  backgroundColor: state.backgroundColor, color: state.color }}>
        {msgs.map((chat, i) => (
          <div
            style={{
              display: "flex",
              justifyContent: chat.id == "other" ? "start" : "end",
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
                    chat.id == "other" ? "rgb(128, 128, 216)" : "violet",
                  borderRadius: "0em 1em 1em",
                }}
                className=" p-3"
              >
                {chat.msg}
              </div>
            </div>
          </div>
        ))}
        <span ref={latestMsgRef}></span>
      </div>

      {/* type input msg */}
      <div className="d-flex align-items-center bg-white p-2  w-100 position-sticky bottom-0">
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