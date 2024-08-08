import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import '../../components/css/login/Login.css';
import * as LoginFunctions from '../../components/js/Login';

const clientId = '810488455404-mih0ne2g3dnmauotl2g7488h6igpek23.apps.googleusercontent.com';

const Login = ({ login }) => {
    const [username, setUserId] = useState('');
    const [password, setUserPW] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    useEffect(() => {
        const fetchNaverToken = async () => {
            const urlParams = new URLSearchParams(location.search);
            const code = urlParams.get('code');
            const state = urlParams.get('state');

            if (code && state) {
                try {
                    const response = await fetch('http://localhost:8080/api/members/auth/naver', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ code, state }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const accessToken = data.access_token;

                        console.log('Access Token:', accessToken);

                        login();
                        navigate('/');
                    } else if (response.status === 302) {
                        const data = await response.json();
                        alert('일치하는 회원 정보가 없습니다. 회원가입으로 넘어갑니다.');
                        navigate('/register/user', { state: { googleName: data.name, googleEmail: data.email } });
                    } else {
                        const errorData = await response.json();
                        console.error('Error fetching token:', errorData);
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        };

        fetchNaverToken();
    }, [location, navigate, login]);

    const handleNaverLogin = () => {
        const clientId = '5rO900R1MymwoUweWWHT';
        const redirectURI = encodeURIComponent('http://localhost:5173/login');
        const state = Math.random().toString(36).substr(2, 11);
        const apiURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&state=${state}`;
        window.location.href = apiURL;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username, //유저의 이메일
                    password, //유저의 패스워드
                }).toString(),
                credentials: 'include',
            });
            if (response.status === 200) {
                LoginFunctions.setAccessToken(response);
                console.log('response 200');
                navigate('/');
            } else {
                console.log('form login error');
                return;
            }
        } catch (error) {
            console.log('form login catch error: ' + error);
        }
    };

    const handleGoogleLoginSuccess = (response) => {
        console.log(response);
        const token = response.code;

        fetch('http://localhost:8080/api/members/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.message === 'User not found') {
                    alert('일치하는 회원 정보가 없습니다. 회원가입으로 넘어갑니다.');
                    navigate('/register/user', { state: { googleName: data.name, googleEmail: data.email } });
                } else {
                    login(); //Google 로그인 성공 시 상태 변경
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleGoogleLoginFailure = (error) => {
        console.log(error);
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            <div className="login_box">
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setUserId(e.target.value)}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="이메일"
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
                    <input type="submit" value="로그인" className="login-button" />
                </form>
                <div className="login-buttons">
                    <div className="google-login">
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="구글아이디로 로그인하기"
                            onSuccess={handleGoogleLoginSuccess}
                            onFailure={handleGoogleLoginFailure}
                            responseType="code"
                        />
                    </div>
                    <div className="naver-login">
                        {
                            <button onClick={handleNaverLogin} className="naver-login-button">
                                <img className="n_logo" src="public/images/login/naverlogo.png" alt="Naver Logo" />{' '}
                                네이버 아이디로 로그인하기
                            </button>
                        }
                    </div>
                </div>
                <div className="footer-links">
                    <Link to="/findemail">이메일 찾기</Link>
                    <Link to="/findpassword">비밀번호 찾기</Link>
                    <Link to="/register/user">회원가입</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
