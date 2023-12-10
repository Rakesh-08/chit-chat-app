import React,{useState} from 'react'
import SearchBar from './SearchBar';
import User from './User';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SavedContacts from './SavedContacts';
import Profile from './Profile';
import AddContactModal from './AddContactModal';
import { useSelector, useDispatch } from "react-redux"
import { dummyUsers } from '../utils';


const HomeLeftPart = () => {
  let [routes, setRoutes] = useState("chats");
  let [addContact, setAddContact] = useState(false);
  let [showActions,setShowActions] = useState(false)
  let state = useSelector(state => state.ThemeReducer);
 

  let deleteAccountFn = () => {
    
  }
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
            setShowActions(!showActions)
          }}
        />

      {showActions&& <div
          style={{
            position: "absolute",
            top: "1.2em",
            right: "1em",
            borderRadius: "0.9em 0em 0.5em 0.9em",
            zIndex:1000
          }}
          className="bg-white text-dark p-3"
        >
          <p
            onClick={() => {localStorage.clear() }}
            className="pointer"
           >
            Logout
          </p>
          
            <p onClick={deleteAccountFn} className="text-danger border-bottom border-2 border-danger pointer">
              Delete Account
            </p>
          
        </div>}  
      </div>

      <div
        style={{
          position: "sticky",
          top: "0em",
          zIndex: 889,
          backgroundColor: state.backgroundColor,
          color: state.color,
        }}
        className="d-flex flex-wrap justify-content-around my-2 border-bottom border-2 "
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