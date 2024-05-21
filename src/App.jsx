import AboutPage from "./components/AboutPage";
import React,{ useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layoutwo from "./components/shared/Layoutwo";
import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import ResetPasswordPage from "./components/ResetPasswordPage";
import Videopart from "./components/Videopart";
import Contact from "./components/Contact";
import Features from './components/Features';
import Team from "./components/Team";
import OTPVerification from "./components/OTPVerification";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Product from "./components/Product";
import Otherpart from "./components/shared/Otherpart";
import Post from "./components/Post";


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
         <Route path="/feature" element={<Features/>}/>
         <Route path="/team" element={<Team/>}/>
         <Route path="/otp-verify" element={<OTPVerification />} />
      </Route>
      
      <Route path="/" element={<Layoutwo/>}>
       <Route path='/dash' element={<Dashboard/>}/>
       <Route path="/products"  element={<Product/>}/>
       <Route path="/other" element={<Otherpart/>}/>
       <Route path="/post" element={<Post/>}/>
       
        </Route> 
      
     
     </Routes>
     
     </BrowserRouter>


  
    </>
    
  )
}

export default App;
