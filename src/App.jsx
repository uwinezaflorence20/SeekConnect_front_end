import AboutPage from "./components/AboutPage";
import React,{ useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import ResetPasswordPage from "./components/ResetPasswordPage";
import Videopart from "./components/Videopart";
import Contact from "./components/Contact";
import Features from './components/Features';



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
         <Route path="/Video" element={<Videopart/>}/>
         <Route path="/contact" element={<Contact/>}/>
         <Route path="/Features" element={<Features/>}/>
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;
