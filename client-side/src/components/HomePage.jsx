import React,{useEffect} from 'react'
import HomeLeftPart from './homeLeftPart';
import HomeRightPart from './HomeRightPart';
import { useNavigate } from "react-router-dom"



const HomePage = () => {
 
  let NavigatTo = useNavigate();

  useEffect(() => {
    // if (!localStorage.getItem("chatToken")) {
    //     NavigatTo("/")
    // }
  },[])
  return (
    <div className="home">
      <HomeLeftPart />

      <div className="mobView w-100">
         <HomeRightPart/>
      </div>
      
    
     
    </div>
  );
}

export default HomePage