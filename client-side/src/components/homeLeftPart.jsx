import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import SearchBar from './SearchBar';
import User from './User';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SavedContacts from './SavedContacts';
import Profile from './Profile';
import AddContactModal from './AddContactModal';
import { useSelector,useDispatch } from "react-redux";
import { getContactCall } from '../apiCalls/userApi';
import { getAllChatRooms } from '../apiCalls/chatApi';



const HomeLeftPart = () => {
  let [routes, setRoutes] = useState("chats");
  let [addContact, setAddContact] = useState(false);
  let [showActions, setShowActions] = useState(false)
  let [chatRooms, setChatRooms] = useState([]);
  let [contacts, setContacts] = useState([]);
  let [messages, setMessaages] = useState([]);
  let state = useSelector(state => state.ThemeReducer);
  let NavigateTo = useNavigate();
  let dispatch = useDispatch();
  
  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
 
  useEffect(() => {
    if (loggedUser) {
      fetchContacts();
      setupChats();
    } 
  }, [])

  let fetchContacts = () => {
   
    getContactCall().then((res) => {
         setContacts(res.data)
    }).catch((err) => {console.log(err)});
  }
  
  
  let setupChats = () => {
   
    getAllChatRooms().then(res => {
      setChatRooms(res.data)
    })
    .catch(err=>{console.log(err)})
 }

  return (
    <div
      style={{
        zIndex: 88,
        minWidth: "25em",
        width: "36vw",
        background: state.backgroundColor,
        color: state.color,
        height:"102vh"
      }}
      className="me-1 py-2  shadow rounded-2"
    >
      <div
        style={{
          border: "2px solid violet",
          boxShadow: "0.2em 0.1em 0.5em  violet",
        }}
        className="mx-2 py-2 display-6 text-center rounded-4  "
      >
        <span className="text-warning">CHIT-</span>{" "}
        <span className="">CHAT</span>
      </div>

      <div className="d-flex position-relative justify-content-end mt-2">
        <MoreVertIcon
          onClick={() => {
            setShowActions(!showActions);
          }}
        />

        {showActions && (
          <div
            style={{
              position: "absolute",
              top: "1.2em",
              right: "1em",
              borderRadius: "0.9em 0em 0.5em 0.9em",
              border: "1px solid  gray",
              zIndex: 1000,
            }}
            className="bg-white text-dark p-1 px-3"
          >
            <p
              onClick={() => {
                let conf = window.confirm("Are you sure you want to logout?");
                if (conf) {
                  localStorage.clear();
                  dispatch({
                    type: "reset",
                  });
                  NavigateTo("/");
                }
              }}
              className="pointer text-danger border-bottom border-2 border-danger"
            >
              Logout
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          backgroundColor: state.backgroundColor,
          color: state.color,
        }}
        className="d-flex flex-wrap justify-content-around  border-bottom border-2 "
      >
        <div
          onClick={() => setRoutes("chats")}
          className={`p-1 pointer ${
            routes == "chats" &&
            " border-bottom border-3 border-primary fs-4 text-primary"
          } `}
        >
          Chats
        </div>

        <div
          onClick={() => setRoutes("contacts")}
          className={`p-1 pointer ${
            routes == "contacts" &&
            " border-bottom border-3 border-primary fs-4 text-primary"
          } `}
        >
          Contacts
        </div>

        <div
          onClick={() => setRoutes("profile")}
          className={`p-1 pointer  ${
            routes == "profile" &&
            " border-bottom border-3 border-primary fs-4 text-primary"
          } `}
        >
          Profile
        </div>

        <div>
          <button
            onClick={() => setAddContact(true)}
            type="button"
            className="btn btn-success"
            data-toggle="tooltip"
            title="new contact"
          >
            +
          </button>
        </div>
      </div>

      <div style={{ overflowY: "auto", height: "78%" }} className="p-2 ">
        {routes == "chats" && (
          <>
            {chatRooms.length > 0 ? (
              <>
                {chatRooms?.map((chatRoom, i) => {
                  let [senderId] = chatRoom.members.filter(
                    (id) => id !== loggedUser?._id
                  );
              let sender = contacts.find((con) => con.id == senderId);
                  return (
                    <User
                      key={i}
                      chatRoomId={chatRoom._id}
                      user={sender}
                      senderId={senderId}
                    />
                  );
                })}
              </>
            ) : (
              <div className="h-100 d-flex align-items-center justify-content-center p-2">
                <p className="w-75 fst-italic text-primary ">
                  You have not started any conversation with anyone,Try to share
                  your feeling ,thoughts or anything you want with others.
                </p>
              </div>
            )}
          </>
        )}

        {routes == "contacts" && (
          <>
            <SearchBar />
            {contacts.length > 0 ? (
              <SavedContacts
                contacts={contacts}
                chatRooms={chatRooms}
              />
            ) : (
              <div className="h-100 d-flex align-items-center justify-content-center p-2">
                <p className="w-75 fst-italic text-secondary ">
                  Your contact list is empty . Connect to your friends and
                  families and save their details here.
                </p>
              </div>
            )}
          </>
        )}

        {routes == "profile" && <Profile />}
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "13px",
          fontWeight: "bold",
          color: "gray",
        }}
      >
        copyrights 2023 @Rakesh_Mandal
      </div>

      <AddContactModal
        refetchFn={fetchContacts}
        addContact={addContact}
        setAddContact={setAddContact}
      />
    </div>
  );
}

export default HomeLeftPart