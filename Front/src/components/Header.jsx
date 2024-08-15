import{useContext, useEffect, useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './css/Header.css';
import logo from '/images/logo.png';
import {AuthContext} from './Auth.jsx';
import { jwtDecode } from "jwt-decode";
const Header=()=>{
    const [isAuthorized, setIsAuthorized, logoutHandler] = useContext(AuthContext);        
    const [role,setRole] = useState();    
    const nav = useNavigate();    
    const rolePageHandler=()=>{
        if(role === 'ROLE_USER'){
            nav('/user/mypage');
        }else if (role === 'ROLE_ADMIN'){
            nav('/admin/');
        }
    }    
    useEffect(()=>{        
        const token = localStorage.getItem('accessToken');
        if (token !== null){
            const user = jwtDecode(token);
            setRole(user.role);
        }
    },[isAuthorized])
    return (
        <div className="Header">
            <nav className="navigation">
                <ul className="list">
                    <li>Tour
                        <ul className="sub_list">
                            <li><Link to="/tour/trip">추천투어</Link></li>
                            <li><Link to="/tour/build">투어생성</Link></li>
                        </ul>
                    </li>
                    <li>Post
                        <ul className="sub_list">
                            <li><Link to="/board/review">여행후기</Link></li>                            
                        </ul>
                    </li>
                    <li>Shop
                        <ul className="sub_list">
                            <li><Link to="/shop/">여행용품</Link></li>
                        </ul>
                    </li>
                    <li>FAQ
                        <ul className="sub_list">
                            <li><Link to="/csr/">&nbsp;FAQ</Link></li>
                        </ul>
                    </li>
                </ul>                
                <div className="logo">
                    <Link to="/"><img src={logo}></img></Link>
                </div>                         
                {isAuthorized ? (
                    <div className="header_info">
                        <div className="role_info">  
                            {role === 'ROLE_USER' ? (
                                <div className="mypage" onClick={()=>rolePageHandler()}>
                                    Mypage
                                </div>
                            ):(
                                <div className="admin" onClick={()=>rolePageHandler()}>
                                    Admin
                                </div>
                            )}
                        </div>
                        <div className="logout">                        
                            <button className='logout_btn' onClick={()=>logoutHandler()}>Logout</button>
                        </div>
                    </div>
                ):(
                    <div className="login">
                        <Link to="/login"><button className='login_btn'>Login</button></Link>                
                    </div>
                )}    
            </nav>
        </div>
    );
}
export default Header;