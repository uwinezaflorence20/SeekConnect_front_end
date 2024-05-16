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
import Dash from '/src/Dash'
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
         <Route path="/dash" element={<Dash/>}/>
         <Route path="/otp-verify" element={<OTPVerification />} />
      </Route>
     </Routes>
     
     </BrowserRouter>


     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layoutwo/>}>
       <Route index  element={<Dashboard/>}/>
       <Route path="/products"  element={<Product/>}/>
        </Route>
      </Routes>
     </BrowserRouter>
    
    </>
  )
}

export default App;
