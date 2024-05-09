import AboutPage from "./components/AboutPage";
import React,{ useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import ResetPasswordPage from "./components/ResetPasswordPage";


function App() {
  return (
    <>
    
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout/>}>
         <Route index element={<Home/>}/>
         <Route path="/about" element={<AboutPage />}/> 
         <Route path="/signin" element={<Signin />}/> 
         <Route path="/signup" element={<Signup />}/> 
         <Route path="/resetpassword" element={<ResetPasswordPage />}/> 
      </Route>
     </Routes>
     </BrowserRouter>
     
    </>
  )
}

export default App;
