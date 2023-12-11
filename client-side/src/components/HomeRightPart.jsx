import React,{useEffect} from 'react'
import Welcome from './Welcome';
import { useSelector,useDispatch } from 'react-redux';
import ChatRoom from './ChatRoom';


const HomeRightPart = () => {
  let dispatch = useDispatch();
  let state = useSelector(state => state.ChatRoomReducer.connect);
     
  useEffect(() => {
    if (state.id !== "welcome") {
      dispatch({
        type: "changeChatRoom",
        payload: {
          id: "welcome"
        },
      });
       }
  },[])
  return (
    <div className="h-100 "> 
      {state.id == "welcome" ? <Welcome /> :
        <ChatRoom connect={state} />}    
      </div>
  )
}

export default HomeRightPart