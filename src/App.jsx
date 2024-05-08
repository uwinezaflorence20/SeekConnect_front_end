import AboutPage from "./components/AboutPage";
import React,{ useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
function App() {
  return (
    <>
    
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout/>}>
         <Route index element={<Home/>}/>
         <Route path="/about" element={<AboutPage />}/> 
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;
