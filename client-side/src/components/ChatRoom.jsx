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
  let [chatMsgs, setChatMsgs] = useState([]);
  let state = useSelector(state => state.ThemeReducer);
  let NavigateTo = useNavigate();


  useEffect(() => {
    scrollToLatestMsg();
    if (localStorage.getItem("chatToken")) {
  
    } else {
      setChatMsgs(msgs)
    }
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
              <span> {connect.savedAs || connect.mobile}</span>
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
                        {new Date().getHours() >= 12
                          ? `${
                              new Date().getHours() - 12
                            }: ${new Date().getMinutes()} pm`
                          : `${new Date().getHours()}:${new Date().getMinutes()} am`}
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
                Start Your conversation  with smile
            </p>
          </div>
        )}

        <span ref={latestMsgRef}></span>
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