import {Routes,Route}from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Trip from './pages/tour/Trip';
import Build from './pages/tour/Build';
import Review from './pages/review/Review';
import ReviewWrite from './pages/review/ReviewWrite'
import ReviewComment from './pages/review/ReviewComment'
import Notice from './pages/notice/Notice';
import Shop from './pages/shop/Shop';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
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
          <Route path="/ReviewComment/:id" element={<ReviewComment/>}/>
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
