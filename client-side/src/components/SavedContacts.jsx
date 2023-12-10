import React from 'react'
import Avatar from './Avatar';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

let contacts = [
  { profilePic: "/dummyImg.jpg", name: "Rahul Mandal" },
  { profilePic: "", name: "Rg ", _id: "4388" },
  { profilePic: "/dummyImg.jpg", name: "Rahul (2nd)" },
  { profilePic: "", name: "Rakesh" },
  { profilePic: "/dummyImg.jpg", name: "Rahul Mandal" },
  { profilePic: "", name: "Rahul Mandal" },
  { profilePic: "", name: "jacky" },
  { profilePic: "/dummyImg.jpg", name: "salman khan" },
  { profilePic: "/dummyImg.jpg", name: "Rahul Mandal" },
  { profilePic: "", name: "Rg ", _id: "4388" },
  { profilePic: "/dummyImg.jpg", name: "Rahul (2nd)" },
  { profilePic: "", name: "Rakesh" },
  { profilePic: "/dummyImg.jpg", name: "Rahul Mandal" },
  { profilePic: "", name: "Rahul Mandal" },
  { profilePic: "", name: "jacky" },
  { profilePic: "/dummyImg.jpg", name: "salman khan" },
];

const SavedContacts = () => {
  let dispatch = useDispatch();
  let NavigateTo = useNavigate();

  return (
    <div className="my-3">
      {contacts.map((contact, i) => (
        <div
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
          className="d-flex align-items-center m-2"
        >
          <Avatar img={contact.profilePic} dim={50} />
          <p className="mx-4">{contact.name}</p>
        </div>
      ))}
    </div>
  );
}

export default SavedContacts