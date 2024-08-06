import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import '../../components/css/login/Login.css';

const clientId = '810488455404-mih0ne2g3dnmauotl2g7488h6igpek23.apps.googleusercontent.com';

const Login = ({ login }) => {
    const [userId, setUserId] = useState('');
    const [userPW, setUserPW] = useState('');
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = { m_userId: userId, m_password: userPW };

        try {
            const response = await fetch('http://localhost:8080/api/members/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.message === 'Login successful') {
                    login(); // 로그인 성공 시 상태 변경
                    navigate('/');
                } else {
                    alert('로그인 실패: ' + data.message);
                }
            } else {
                const errorData = await response.json();
                alert('로그인 실패: ' + errorData.message);
                console.error('Failed to login', errorData);
            }
        } catch (error) {
            console.error('There was an error!', error);
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
                    login(); // Google 로그인 성공 시 상태 변경
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

    const handleNaverLogin = () => {
        const clientId = '5rO900R1MymwoUweWWHT';
        const redirectURI = encodeURIComponent('http://localhost:5173/login');
        const state = Math.random().toString(36).substr(2, 11);
        const apiURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&state=${state}`;
        window.location.href = apiURL;
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            <div className="login_box">
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setUserId(e.target.value)}
                        type="text"
                        name="userId"
                        id="userId"
                        placeholder="ID"
                        className="input-field"
                    />
                    <input
                        onChange={(e) => setUserPW(e.target.value)}
                        type="password"
                        name="userPW"
                        id="userPW"
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
                        <button onClick={handleNaverLogin} className="naver-login-button">
                            <img className="n_logo" src="public/images/login/naverlogo.png" alt="Naver Logo" /> 네이버
                            아이디로 로그인하기
                        </button>
                    </div>
                </div>
                <div className="footer-links">
                    <a href="#">비밀번호 찾기</a>
                    <a href="#">아이디 찾기</a>
                    <Link to="/register/user">회원가입</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
