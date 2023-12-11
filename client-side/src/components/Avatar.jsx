import React from "react";
import { useNavigate } from "react-router";

let dummyImg="/user_3177440.png"

const Avatar = ({ img, dim, userId}) => {
  let NavigateTo = useNavigate();

  return (
    <div>
          <img
              className="rounded-circle"
              width={dim}
              height={dim}
              src={img||dummyImg}
              alt="avatar"
   />
    </div>
  );
};

export default Avatar;
