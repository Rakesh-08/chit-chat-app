import React from 'react';
import { useNavigate } from "react-router-dom";

const Welcome = ({ }) => {
  let NavigateTo = useNavigate();

  return (
    <div style={{ backgroundImage: "url(/welcomeTheme.jpg)", backgroundSize: "cover", height: "100vh", display:"flex",justifyContent:"center",alignItems:"center"}} >
          <div className="mx-2 text-center">
              <h4>Welcome To Chit-Chat application</h4>
        <p>Please start your conversation <span onClick={() => { NavigateTo("/Home") }} className="text-primary pointer">Click here</span></p>
          </div>
    </div>
  )
}

export default Welcome