import React from 'react'
import Avatar from './Avatar';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

const User = ({ user }) => {
  let dispatch = useDispatch();
  let NavigateTo=useNavigate()

  return (
    <div onClick={() => {
      dispatch({
        type: "changeChatRoom",
        payload: user
      })

      if (window.innerWidth <= 600) {
        NavigateTo("/chat-room")
      }
    }} className="d-flex shadow rounded-4  m-1 p-3">

      <Avatar img={user.profilePic} dim={55} />

      <div className="w-100 mx-2">
        <div className="d-flex justify-content-between">
          <span className="fw-bold">{user.name || user.mobile}</span>
          <span style={{ fontSize: "12px",color:"darkOrange" }}>2h ago</span>
        </div>
        <div style={{ fontSize: "14px" }}>
          {user.lastMsg?.length > 40
            ? `${user.lastMsg.slice(0, 40)}.....`
            : user.lastMsg}
        </div>
      </div>
    </div>
  );
}

export default User