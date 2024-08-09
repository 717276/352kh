import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/css/login/Login.css';
const Login = ({ login }) => {
    const [username, setUserId] = useState('');
    const [password, setUserPW] = useState('');
    const navigate = useNavigate();
    function googleLoginHandler() {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    }
    const formLogin = async () => {
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
            if (response.status === 200) {
                navigate('/');
            } else {
                console.log('form login error');
                return;
            }
        } catch (error) {
            console.log('form login catch error: ' + error);
        }
    };
    return (
        <div className="login-container">
            <h2>로그인</h2>
            <div className="login_box">
                <input
                    onChange={(e) => setUserId(e.target.value)}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="ID"
                    className="input-field"
                />
                <input
                    onChange={(e) => setUserPW(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="PASSWORD"
                    className="input-field"
                />
                <input type="submit" value="로그인" className="login-button" onClick={() => formLogin()} />
                <div className="login-buttons">
                    <div
                        className="google-login"
                        onClick={() => {
                            googleLoginHandler();
                        }}
                    >
                        구글 로그인
                    </div>
                    <div className="naver-login">
                        <a href="/oauth2/authorization/naver">
                            <img className="n_logo" src="public/images/login/naverlogo.png" alt="Naver Logo" />{' '}
                        </a>
                    </div>
                </div>
                <div className="footer-links">
                    <div onClick={() => navigate('/findemail')}>이메일 찾기</div>
                    <div onClick={() => navigate('/findpassword')}>비밀번호 찾기</div>
                    <div onClick={() => navigate('/register/user')}>회원가입</div>
                </div>
            </div>
        </div>
    );
};

export default Login;
