import { Routes, Route , useLocation} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';

import Tour from './pages/tour/Tour.jsx';
import Board from './pages/board/Board.jsx';
import Admin from './pages/admin/Admin.jsx';
import Store from './pages/shop/Store.jsx';
import User from './pages/user/User.jsx';
import Csr from './pages/csr/Csr.jsx';

import Login from './pages/login/Login';
import Register from './pages/login/Register';
import SelectTm from './pages/login/SelectTm.jsx';
import FindEmail from './pages/login/FindEmail.jsx';
import FindPassword from './pages/login/FindPassword.jsx';
import { AuthProvider, DataProvider } from './components/Auth.jsx'; // context.js 파일에서 import
import './App.css';

function App() {   
  const location = useLocation();
  const pop = location.pathname.match('/chat/room/*'); 
  return (
    <>    
    <AuthProvider>
    <DataProvider>
      <div className="Full">
        {!pop && <Header></Header>}        
          <Routes>        
            <Route path="/" element={<Main />} />
            <Route path="/tour/*" element={<Tour />} />                          
            <Route path="/board/*" element={<Board />}/>            
            <Route path="/admin/*" element={<Admin/>}/>            
            <Route path="/shop/*" element={<Store />} />
            <Route path="/user/*" element={<User />}/>            
            <Route path="/csr/*" element={<Csr/>}/>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/preference" element={<SelectTm />} /> 
            <Route path="/findemail" element={<FindEmail/>}/>
            <Route path="/findpassword" element={<FindPassword/>}/>
            
          </Routes>          
        {!pop && <Footer></Footer>}
        </div>                
      </DataProvider>
      </AuthProvider>
    </>
  )
}

export default App;
