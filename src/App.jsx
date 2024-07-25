import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Trip from './pages/tour/Trip';
import TripDetail from './pages/tour/TripDetail';
import Build from './pages/tour/Build';
import Review from './pages/review/Review';
<<<<<<< HEAD
import ReviewWrite from './pages/review/ReviewWrite'
import ReviewComment from './pages/review/ReviewComment'
=======
import ReviewWrite from './pages/review/ReviewWrite';
import ReviewModify from './pages/review/ReviewModify';
>>>>>>> 1d5c7020000639ed2642d0dd1bb729752314b5b7
import Notice from './pages/notice/Notice';
import Shop from './pages/shop/Shop';
import Product from './pages/shop/Product';
import ShopList from './pages/shop/ShopList';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
<<<<<<< HEAD
import ProductList from "./pages/admin/ProductList";
import ProductRegister from "./pages/admin/ProductRegister";
function App() {  
  return (
    <>    
    <div className="Full">
      <Header></Header>          
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/trip" element={<Trip />} />
          <Route path="/tripDetail/:no" element={<TripDetail />} />
          <Route path="/build" element={<Build />} />
          <Route path="/review" element={<Review />} />
          <Route path="/reviewWrite" element={<ReviewWrite/>}/> 
<<<<<<< HEAD
          <Route path="/reviewModify/:no" element={<ReviewModify/>}/>
          <Route path="/notice" element={<Notice />} />
          <Route path="/shop" element={<Shop />} />      
          <Route path="/login" element={<Login />} />      
          <Route path="/register" element={<Register />} /> 
=======
          <Route path="/ReviewComment/:id" element={<ReviewComment/>}/>
          <Route path="/notice" element={<Notice />} />
          <Route path="/shop" element={<Shop />} />      
          <Route path="/login" element={<Login />} />      
          <Route path="/register" element={<Register />} />   
          <Route path="/admin/productList" element={<ProductList />} />    
          <Route path="/admin/ProductRegister" element={<ProductRegister />} />      
>>>>>>> 7548adffaddec9a9e3010a16f925e668f08133dd
        </Routes>          
      <Footer></Footer>
    </div>
    </>
  )
=======

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
                    <Route path="/reviewWrite" element={<ReviewWrite />} />
                    <Route path="/reviewModify/:id" element={<ReviewModify />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/shoplist" element={<ShopList />} />
                </Routes>
                <Footer></Footer>
            </div>
        </>
    );
>>>>>>> 1d5c7020000639ed2642d0dd1bb729752314b5b7
}

export default App;
