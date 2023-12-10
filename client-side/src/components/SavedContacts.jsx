import React from 'react'
import Avatar from './Avatar';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { contacts } from '../utils';

const SavedContacts = () => {
  let dispatch = useDispatch();
  let NavigateTo = useNavigate();

  return (
    <div className="my-3">
      {contacts.map((contact, i) => (
        <div
          style={{cursor:"pointer"}}
          onClick={() => {
            dispatch({
              type: "changeChatRoom",
              payload: contact
             
            })
            if (window.innerWidth <= 600) {
              NavigateTo("/chat-room")
            }
          } }
          key={i}
          className="d-flex align-items-center m-2 my-3"
        >
          <Avatar img={contact.profilePic} dim={40} />
          <p className="mx-4">{contact.name}</p>
        </div>
      ))}
    </div>
  );
}

export default SavedContacts