import { Link } from 'react-router-dom';
import './css/Header.css';
const Header=()=>{
    return (
        <div className="Header">
            <nav className="navigation">
                <ul className="list">
                    <li>Tour
                        <ul className="sub_list">
                            <li><Link to="/trip">추천투어</Link></li>
                            <li><Link to="/build">투어생성</Link></li>
                        </ul>
                    </li>
                    <li>Post
                        <ul className="sub_list">
                            <li><Link to="/review">여행후기</Link></li>
                            <li><Link to="/notices">공지사항</Link></li>
                        </ul>
                    </li>
                    <li>Shop
                        <ul className="sub_list">
                            <li><Link to="/shop">여행용품</Link></li>
                        </ul>
                    </li>
                </ul>
                <div className="logo">
                    <img src="default"></img>
                </div>            
                <div className="login">
                    <Link to="/login"><button className='login_btn'>Login</button></Link>                
                </div>
            </nav>
        </div>
    );
}
export default Header;