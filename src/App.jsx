import {Routes,Route}from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Trip from './pages/Trip';
import Build from './pages/Build';
import Review from './pages/Review';
import Notice from './pages/Notice';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import ReviewWrite from './components/ReviewWrite'
import ReviewModify from './components/ReviewModify'
function App() {  
  return (
    <>    
    <div className="Full">
      <Header></Header>          
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/trip" element={<Trip />} />
          <Route path="/build" element={<Build />} />
          <Route path="/review" element={<Review />} />
          <Route path="/reviewWrite" element={<ReviewWrite/>}/> 
          <Route path="/reviewModify/:id" element={<ReviewModify/>}/>
          <Route path="/notice" element={<Notice />} />
          <Route path="/shop" element={<Shop />} />      
          <Route path="/login" element={<Login />} />      
          <Route path="/register" element={<Register />} />      
        </Routes>          
      <Footer></Footer>
    </div>
    </>
  )
}

export default App
