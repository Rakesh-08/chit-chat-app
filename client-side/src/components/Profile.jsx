import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import Avatar from "../components/Avatar"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";

let LoggedUser = {
  profilePic: "",
  email: "abc@example.com",
  mobile: "9388383998",
  name: "User",
  
}

const Profile = () => {
  let [showEdit, setShowEdit] = useState(false);
  let [editData, setEditData] = useState({ user: LoggedUser.name, mobile: LoggedUser.mobile });
  let [imgUpload, setImgUpload] = useState('')
  
  let themeToggle=useSelector(state=>state.ThemeReducer.themeToggle)
 
  let dispatch = useDispatch();
 
  let handleEditForm = (e) => {
      setShowEdit(false)
  }

  
  return (
    <div
      style={{ minHeight: "55%" }}
      className="d-flex text-center p-2  flex-column align-items-center justify-content-center position-relative"
    >
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        <button className="btn btn-sm border border-info border-2  rounded-5 bg-white m-2">
          <span
            className={`${
              !themeToggle ? "bg-dark  rounded-5" : "text-warning"
            }`}
            onClick={() => {
              dispatch({
                type: "changeTheme",
                mode: "light",
              });
             
              localStorage.setItem("theme","light")
            }}
          >
            <LightModeIcon style={{ height: "15px" }} />
          </span>
          <span
            className={`text-dark ${themeToggle && "bg-dark rounded-5"} `}
            onClick={() => {
              dispatch({
                type: "changeTheme",
                mode: "dark",
              });
             
              localStorage.setItem("theme", "dark");
            }}
          >
            {" "}
            <ModeNightIcon style={{ height: "15px" }} />
          </span>
        </button>
      </div>
      <div className="position-relative   ">
        <Avatar img={LoggedUser.profilePic} dim={100} />
        <p>{LoggedUser.name || "User"}</p>
        <input
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImgUpload(e.target.files[0]);
              e.target.value = "";
            }
          }}
          className="d-none"
          type="file"
          id="uploadImg"
        />
        <label htmlFor="uploadImg">
          {" "}
          <AddAPhotoIcon
            style={{
              position: "absolute",
              top: "45%",
              right: "10px",
              zIndex: 999,
            }}
          />
        </label>
      </div>

      <div className=" d-flex  w-100 justify-content-end">
        <span data-toggle="tooltip" title="edit profile" className="mx-3">
          <EditIcon onClick={() => setShowEdit(true)} />
        </span>
      </div>
      <div>
        <h4>M: {LoggedUser.mobile}</h4>
        <p style={{ color: "purple" }}>{LoggedUser.email}</p>
      </div>
      {showEdit && (
        <div>
          <p className="fst-italic my-3 lead">Update Profile</p>
          <form
            onSubmit={handleEditForm}
            className="bg-info rounded shadow-lg m-3 p-2"
          >
            <input
              value={editData.user}
              onChange={(e) =>
                setEditData({ ...editData, user: e.target.value })
              }
              className="form-control m-1"
              placeholder="Username"
            />

            <input
              value={editData.mobile}
              onChange={(e) =>
                setEditData({ ...editData, mobile: e.target.value })
              }
              className="form-control m-1"
              placeholder="Mobile No."
            />

            <div className="mt-3">
              <button className="btn btn-warning text-white">confirm</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile