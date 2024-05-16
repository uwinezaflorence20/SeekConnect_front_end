import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Product from "./components/Product";
import Dashboard from "./components/Dashboard";
import Layoutwo from "./components/shared/Layoutwo";
const Dash = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layoutwo/>}>
       <Route index  element={<Dashboard/>}/>
       <Route path="/products"  element={<Product/>}/>
        </Route>
      </Routes>
     </BrowserRouter>
    
    </div>
  )
}

export default Dash
