import { Routes, Route , useLocation} from 'react-router-dom';
import { useState, useEffect, useContext  } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Trip from './pages/tour/Trip';
import TripDetail from './pages/tour/TripDetail';
import Build from './pages/tour/Build';
import Review from './pages/review/Review';
import ReviewWrite from './pages/review/ReviewWrite'
import ReviewComment from './pages/review/ReviewComment';
import Notice from './pages/notice/Notice';
import Shop from './pages/shop/Shop';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import ProductList from './pages/admin/ProductList';
import ProductRegister from './pages/admin/ProductRegister';
import ReviewModify from './pages/review/ReviewModify';
import MyPage from './pages/mypage/MyPage';
import Product from './pages/shop/Product';
import ShopList from './pages/shop/ShopList';
import QnA from './pages/csr/QnA';
import Managerment from './pages/admin/Management';
import { AuthProvider, DataProvider } from './components/Auth.jsx'; // context.js 파일에서 import


function App() {   
  return (
    <>    
    <AuthProvider>
    <DataProvider>
      <div className="Full">
        <Header></Header>          
          <Routes>        
            <Route path="/" element={<Main />} />
            <Route path="/trip" element={<Trip />} />
            <Route path="/tripDetail/:no" element={<TripDetail />} />
            <Route path="/build" element={<Build />} />
            <Route path="/review" element={<Review />} />
            <Route path="/reviewWrite" element={<ReviewWrite/>}/> 
            <Route path="/ReviewComment/:id" element={<ReviewComment/>}/>
            <Route path="/notice" element={<Notice />} />
            <Route path="/shop" element={<Shop />} />      
            <Route path="/login" element={<Login />} />      
            <Route path="/register" element={<Register />} />   
            <Route path="/admin/productList" element={<ProductList />} />    
            <Route path="/admin/ProductRegister" element={<ProductRegister />} /> 
            <Route path="/reviewComment/:id" element={<ReviewComment/>}/>
            <Route path="/reviewModify/:id" element={<ReviewModify/>}/>
            <Route path="/shop" element={<Shop />} />
            <Route path="/shoplist/:category" element={<ShopList />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/qna" element={<QnA/>}/>
            <Route path="/mg" element={<Managerment/>}/>
          </Routes>          
        <Footer></Footer>
        </div>
      </DataProvider>
      </AuthProvider>
    </>
  )
}

export default App;
