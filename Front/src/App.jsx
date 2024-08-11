import { Routes, Route , useLocation} from 'react-router-dom';
import { useState, useEffect, useContext  } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';

import Tour from './pages/tour/Tour.jsx';
import Board from './pages/review/Board.jsx';
import Admin from './pages/admin/Admin.jsx';

import Notice from './pages/notice/Notice';
import QnA from './pages/csr/QnA';
import Shop from './pages/shop/Shop';
import Product from './pages/shop/Product';
import ShopList from './pages/shop/ShopList';

import Login from './pages/login/Login';
import Register from './pages/login/Register';
import SelectTm from './pages/login/SelectTm.jsx';

import MyPage from './pages/mypage/MyPage';
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
            <Route path="/tour/*" element={<Tour />} />                          
            <Route path="/board/*" element={<Board />}/>            
            <Route path="/admin/*" element={<Admin/>}/>             
            

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/preference" element={<SelectTm />} />

            <Route path="/mypage" element={<MyPage />} />
            {/* url 변경 */}
            <Route path="/shop" element={<Shop />} />
            {/* shoplist -> shop/list */}
            <Route path="/shop/list/:category" element={<ShopList />} />                                                                                          
            <Route path="/notice" element={<Notice />} />
            <Route path="/qna" element={<QnA/>}/>
          </Routes>          
        <Footer></Footer>
        </div>
      </DataProvider>
      </AuthProvider>
    </>
  )
}

export default App;
