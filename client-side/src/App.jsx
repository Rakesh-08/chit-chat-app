import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/loginPage';
import HomePage from './components/HomePage';
import HomeRightPart from './components/HomeRightPart';

function App() {
  

  return (
    <BrowserRouter>
      <div>
          <div style={{ height: "10rem", width: '10rem', background: "skyBlue", borderRadius: "50%", filter: "blur(5em)", position: "absolute", bottom: "5em", left: "7em",zIndex:-1}}>
  </div>
      <div style={{ height: "10rem", width: '10rem', background: "skyBlue", borderRadius: "50%", filter: "blur(5em)", position: "absolute", top: "5em", right: "7em",zIndex:-1 }}></div>
      </div>
    
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/Home" element={<HomePage />}></Route>
        <Route path="/chat-room" element={<HomeRightPart/>}></Route>
      </Routes>
        
      </BrowserRouter>
     
  )
}

export default App
