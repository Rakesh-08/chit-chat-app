import React,{useState,useEffect} from 'react'
import Avatar from './Avatar';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const SavedContacts = ({contacts,chatRooms,searchTerm}) => {

  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"))

  return (
    <div className="my-3">
      {contacts
        .filter((con) =>
          con.savedAs.toUpperCase().includes(searchTerm.toUpperCase())
        )
        .map((contact, i) => {
          let chatR = chatRooms.find((cr) => {
            if (
              cr.members.includes(contact.id) &&
              cr.members.includes(loggedUser._id)
            ) {
              return true;
            }
          });

          return (
            <SingleChat key={i} contact={contact} chatRoomId={chatR._id} />
          );
        })}
    </div>
  );
}

let SingleChat = ({contact,chatRoomId}) => {
  
  let dispatch = useDispatch();
   let NavigateTo = useNavigate();
  
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        dispatch({
          type: "changeChatRoom",
          payload: {
            ...contact, chatRoomId: chatRoomId
          }
        });
        if (window.innerWidth <= 600) {
          NavigateTo("/chat-room");
        }
      }}
     
      className="d-flex align-items-center m-2 my-3"
    >
      <Avatar img={contact?.userImg} dim={40} />
      <p className="mx-4">{contact.savedAs || contact.mobile}</p>
    </div>
  );
}

export default SavedContacts