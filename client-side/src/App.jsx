import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/loginPage';
import HomePage from './components/HomePage';
import HomeRightPart from './components/HomeRightPart';

function App() {
  

  return (
    <BrowserRouter>
  
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/Home" element={<HomePage />}></Route>
        <Route path="/chat-room" element={<HomeRightPart/>}></Route>
      </Routes>
        
      </BrowserRouter>
     
  )
}

export default App
