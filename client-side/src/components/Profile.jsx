import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import Avatar from "../components/Avatar"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { updateUserCall, uploadImg } from '../apiCalls/userApi';

let dummyUser = {
  profilePic: "",
  email: "abc@example.com",
  mobile: "9388383998",
  username: "User",
  
}

const Profile = () => {
  let [showEdit, setShowEdit] = useState(false);
  let [loggedUser, setLoggedUser] = useState({})
  let [editData, setEditData] = useState({});
  
  let themeToggle=useSelector(state=>state.ThemeReducer.themeToggle)
 
  let dispatch = useDispatch();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("LoggedUser"));
        if (user) {
          setLoggedUser(user);
          setEditData({user:user.username,mobile:user.mobile})
        } else {
          setLoggedUser(dummyUser);
          setEditData({ user: user.username, mobile: user.mobile });
       }
  },[])
 
  let handleEditForm = (e) => {
    e.preventDefault();
    let temp = {
      username:editData.user
    }
    
    updateUserCall(temp).then(res => {
     
      localStorage.setItem("LoggedUser", JSON.stringify(res.data));
      setLoggedUser(res.data);
      setShowEdit(false)
    }).catch(err => {
      console.log(err)
      alert(err.response.data?.message)
    });
      
  }

  
  return (
    <div
      style={{ minHeight: "65%" }}
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
      <div style={{width:"10em",position:"relative"}}>
        <Avatar img={loggedUser.profilePic} dim={100} />
        <p className="mt-1">{loggedUser.username } </p>
        <input
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              let Data = new FormData();
              Data.append("profile", e.target.files[0]);

              uploadImg(Data).then((res) => {
                localStorage.setItem("LoggedUser", JSON.stringify(res.data));
                setLoggedUser(res.data)
              }).catch(err => {
                console.log(err);
                alert(err.response.data?.message)
              })
              
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
              right: "22%",
              zIndex: 999,
              color:"darkBlue"
            }}
          />
        </label>
      </div>

      <div className=" d-flex  w-100 justify-content-end">
        <span data-toggle="tooltip" title="edit profile" className="mx-3">
          <EditIcon onClick={() => setShowEdit(!showEdit)} />
        </span>
      </div>
      <div>
        <h4>M: {loggedUser.mobile}</h4>
        <p style={{ color: "purple" }}>{loggedUser.email}</p>
      </div>
      {showEdit && (
        <div>
          <p className="fst-italic my-3 lead">Update Username</p>
          <form
            onSubmit={handleEditForm}
            className="bg-warning rounded shadow-lg m-3 p-2"
          >
            <input
              value={editData.user}
              onChange={(e) =>
                setEditData({ ...editData, user: e.target.value })
              }
              className="form-control m-1"
              placeholder="Username"
            />

            <div className="mt-3">
              <button type="submit" className="btn btn-info ">confirm</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile