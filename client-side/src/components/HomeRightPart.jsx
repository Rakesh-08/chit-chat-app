import React from 'react'
import Welcome from './Welcome';
import { useSelector } from 'react-redux';
import ChatRoom from './ChatRoom';


const HomeRightPart = () => {

  let state = useSelector(state => state.ChatRoomReducer.connect);

  return (
    <div className="h-100 "> 
      {state.id == "welcome" ? <Welcome /> :
        <ChatRoom connect={state} />}    
      </div>
  )
}

export default HomeRightPart