import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import '../components/css/Login.css';

const Login = () => {
    const clientId = 'clientID';
    return (
        <div className="login-container">
            <input type="text" name="userId" id="userId" placeholder="ID" className="input-field" />
            <input type="password" name="userPW" id="userPW" placeholder="PASSWORD" className="input-field" />
            <input type="button" value="로그인" className="login-button" />
            <div className="google-login">
                <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                        onSuccess={(res) => {
                            console.log(res);
                        }}
                        onFailure={(err) => {
                            console.log(err);
                        }}
                    />
                </GoogleOAuthProvider>
            </div>
            <div className="footer-links">
                <a href="#">비밀번호 찾기</a>
                <a href="#">아이디 찾기</a>
                <Link to="/register">회원가입</Link>
            </div>
        </div>
    );
};

export default Login;
