import{useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import logo from '../images/logo.png';
import {AuthContext} from './Auth.jsx';
const Header=()=>{
    const [isAuthorized, setIsAuthorized] = useContext(AuthContext);    
    console.log(isAuthorized);    
    const LogoutHandler=()=>{
        console.log(isAuthorized);
        localStorage.removeItem('accessToken');
        document.cookie = "refresh=123; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
        setIsAuthorized(false);
    }
    useEffect(()=>{         
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
                            <li><Link to="/board/notices">공지사항</Link></li>
                        </ul>
                    </li>
                    <li>Shop
                        <ul className="sub_list">
                            <li><Link to="/shop/">여행용품</Link></li>
                        </ul>
                    </li>
                    <li>QnA
                        <ul className="sub_list">
                            <li><Link to="/qna">&nbsp;QnA</Link></li>
                        </ul>
                    </li>
                </ul>                
                <div className="logo">
                    <Link to="/"><img src={logo}></img></Link>
                </div>         
                {isAuthorized ? (
                    <div className="logout">                        
                        <button className='logout_btn' onClick={()=>LogoutHandler()}>Logout</button>
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