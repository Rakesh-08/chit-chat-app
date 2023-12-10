import React from 'react'
import Avatar from './Avatar';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

const User = ({ user }) => {
  let dispatch = useDispatch();
  let NavigateTo=useNavigate()

  return (
    <div
      style={{cursor:"pointer"}}
      onClick={() => {
      dispatch({
        type: "changeChatRoom",
        payload: user
      })

      if (window.innerWidth <= 600) {
        NavigateTo("/chat-room")
      }
    }} className="d-flex py-3 mx-1">

      <Avatar img={user.profilePic} dim={45} />

      <div className="w-100 mx-2">
        <div className="d-flex justify-content-between">
          <span className="fw-bold">{user.name || user.mobile}</span>
          <span style={{ fontSize: "12px",color:"darkOrange" }}>2h ago</span>
        </div>
        <div style={{ fontSize: "14px",color:"rgb(94,94,88)" }}>
          {user.lastMsg?.length > 40
            ? `${user.lastMsg.slice(0, 40)}.....`
            : user.lastMsg}
        </div>
      </div>
    </div>
  );
}

export default User