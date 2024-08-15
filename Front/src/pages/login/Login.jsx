import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/css/login/Login.css';
import { AuthContext } from '../../components/Auth';
const HTTP_STATUS = {
    OK: 200,    
    NOT_FOUND: 404,    
};
const Login = () => {
    const [username, setUserId] = useState('');
    const [password, setUserPW] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef();
    const [isAuthorized,setIsAuthorized] = useContext(AuthContext);
    useEffect(()=>{
        if(isAuthorized){            
            alert("로그인")            
            navigate('/');
        }
    },[isAuthorized])
    function googleLoginHandler() {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';                
    }
    const loginHandler=(e)=>{
        if (e.key === 'Enter'){
            formLogin();
        }
    }
    const formLogin = async () => {
        if (username === '' || password === ''){
            alert("이메일 & 비밀번호 입력");            
            inputRef.current.focus();
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username,
                    password,
                }).toString(),
                credentials: 'include',
            });

            if (response.status === HTTP_STATUS.OK) {      
                alert("로그인");          
                localStorage.setItem('accessToken', response.headers.get('authorization'));
                setIsAuthorized(true);
                navigate('/');
            } else if(response.status === HTTP_STATUS.NOT_FOUND){
                setUserId('');
                setUserPW('');
                inputRef.current.focus();
                alert("로그인 실패");
                return;
            }
        } catch (error) {
            console.log('form login catch error: ' + error);
        }
    };
    return (
        <div className="login-container">
            <h2>로그인</h2>
            <div className="login_box_wrapper">
                <div className="login_box">
                    <input
                        onChange={(e) => setUserId(e.target.value)}                    
                        ref={inputRef}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="ID"
                        className="input-field"
                        value={username} 
                    />
                    <input
                        onChange={(e) => setUserPW(e.target.value)}
                        onKeyDown={(e)=> loginHandler(e)}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="PASSWORD"
                        className="input-field"
                        value={password}                        
                    />
                    <input type="submit" value="로그인" className="login-button" onClick={() => formLogin()} />
                </div>
                <div className="login-buttons">
                    <div className='google-login-wrapper'>
                        <img className="google-login"  src="/public/images/login/google_login.png"  onClick={() => {
                                googleLoginHandler();
                            }} />                                        
                    </div>
                    <div className='naver-login-wrapper'>
                        <img className="naver-login" src="/public/images/login/naver_login.png" alt="Naver Logo" />{' '}
                            {/* <a href="/oauth2/authorization/naver">
                            </a> */}                    
                    </div>
                </div>
                <div className="footer-links">
                    <div onClick={() => navigate('/findemail')}>이메일 찾기</div>
                    <div onClick={() => navigate('/findpassword')}>비밀번호 찾기</div>
                    <div onClick={() => navigate('/register')}>회원가입</div>
                </div>
            </div>
        </div>
    );
};

export default Login;