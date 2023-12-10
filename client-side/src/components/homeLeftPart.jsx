import React,{useState} from 'react'
import SearchBar from './SearchBar';
import User from './User';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SavedContacts from './SavedContacts';
import Profile from './Profile';
import AddContactModal from './AddContactModal';
import { useSelector, useDispatch } from "react-redux"


let dummyUsers = [
  { _id:"3",
    profilePic: "",
    name: "Rakesh",
    mobile: "4883084",
    lastMsg: "This is the first message ",
  },
  {
    profilePic: "",
    name: "Rakesh",
    mobile: "4883084",
    lastMsg: "This is the first message ",
  },
  {
    profilePic: "",
    name: "",
    mobile: "4883084",
    lastMsg: "This is the first message ",
  },
  {
    profilePic: "",
    name: "Rakesh",
    mobile: "4883084",
    lastMsg: "This is the first message ",
  },
  {
    profilePic: "",
    name: "Rakesh",
    mobile: "4883084",
    lastMsg: "This is the first message ",
  },
  {
    profilePic: "",
    name: "Rakesh",
    mobile: "4883084",
    lastMsg: "This is the first message what if the message is not short then only show some part of the message",
  },
  {
    profilePic: "",
    name: "",
    mobile: "4883084",
    lastMsg: "This is the first message ",
  },
  {
    profilePic: "",
    name: "Rakesh",
    mobile: "4883084",
    lastMsg: "This is the first message ",
  },
];

const HomeLeftPart = () => {
  let [routes, setRoutes] = useState("chats");
  let [addContact, setAddContact] = useState(false);
  let state = useSelector(state => state.ThemeReducer);
 

  return (
    <div
      style={{
        zIndex: 88,
        overflowY: "auto",
        minWidth: "25em",
        width: "36vw",
        background: state.backgroundColor,
        color: state.color,
      }}
      className="me-3 py-2  shadow rounded-2"
    >
      <div className="mx-2 py-2 display-6 text-center rounded-4 shadow ">
        <span className="text-warning">CHIT-</span>{" "}
        <span className="">CHAT</span>
      </div>
      <div className="d-flex justify-content-end mt-2"><MoreVertIcon onClick={() => {alert("Some more action tabs need to be inserted") }} /></div>
      <div
        style={{ position: "sticky", top: "0em", zIndex: 889 }}
        className="d-flex flex-wrap justify-content-around my-2 py-3"
      >
        <div
          onClick={() => setRoutes("chats")}
          className={`p-1 pointer ${
            routes == "chats" &&
            " border-bottom border-2 border-primary fs-4 text-primary"
          } `}
        >
          Chats
        </div>

        <div
          onClick={() => setRoutes("contacts")}
          className={`p-1 pointer ${
            routes == "contacts" &&
            " border-bottom border-2 border-primary fs-4 text-primary"
          } `}
        >
          Contacts
        </div>
        <div
          onClick={() => setRoutes("profile")}
          className={`p-1 pointer  ${
            routes == "profile" &&
            " border-bottom border-2 border-primary fs-4 text-primary"
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

      <hr className="mb-1" />
      {routes == "contacts" && (
        <div className="p-2">
          <SearchBar />
          <SavedContacts />
        </div>
      )}

      {routes == "chats" && (
        <div className="p-2">
          {dummyUsers.map((user, i) => {
            return <User key={i} user={user} />;
          })}
        </div>
      )}

      {routes == "profile" && <Profile />}


      <AddContactModal addContact={addContact} setAddContact={setAddContact} />
    </div>
  );
}

export default HomeLeftPart