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


import LayoutAdmin from "./Admin/sharedAdmin/LayoutAdmin";
import DashboardAdmin from "./Admin/DashboardAdmin";
import Products from "./Admin/Products";
import Orders from "./Admin/Orders";
import Customers from "./Admin/Customers";
import Transactions from "./Admin/Transactions";





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

          <Route path="/" element={<LayoutAdmin />}>
            <Route path="/dashboardadmin" element={<DashboardAdmin />} />
            <Route path="product" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
          <Route path="login" element={<div>this is login page</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
