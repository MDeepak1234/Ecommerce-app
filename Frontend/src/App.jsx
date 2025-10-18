import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Order from './Pages/Order'
import Cart from './Pages/Cart'
import PlaceOrder from './Pages/PlaceOrder'
import Login from './Pages/Login'
import Navbar from './Componenets/Navbar'
import Footer from './Componenets/Footer'
import SearchBar from './Componenets/SearchBar'
 import { ToastContainer, toast } from 'react-toastify';
 import "react-toastify/dist/ReactToastify.css";
import Verify from './Pages/Verify'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/collection' element={<Collection/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/product/:productId' element={<Product/>}></Route>
        <Route path='/orders' element={<Order/>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/placeorder' element={<PlaceOrder/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
