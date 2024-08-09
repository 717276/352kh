import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/css/login/FindPassword.css';
const FindPassword = () => {
    const [user, setUser] = useState({ userEmail: '', userTel: '' });
    const [findError, setFindError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/members/find_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: user.userEmail,
                    userTel: user.userTel,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.text(); // 문자열 응답을 처리합니다.
            console.log(data);
            alert('이메일 발송이 완료되었습니다');
            navigate('/'); // 오류 없으면 전달 완료 페이지로 이동
        } catch (error) {
            setFindError('이메일 or 휴대전화 정보 오류');
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    return (
        <div className="findpw-container">
            <form onSubmit={handleSubmit}>
                <div className="find_sub">
                    <div>가입 시 등록한 휴대폰 번호와 이메일을 입력하면</div>
                    <div>이메일로 임시 비밀번호를 보내드립니다.</div>
                </div>
                <div>
                    <h3>휴대폰 번호</h3>
                    <div className="userTel">
                        <input type="text" id="userTel" placeholder="01012345678" onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <h3>이메일 주소</h3>
                    <input type="text" id="userEmail" placeholder="예) DaengTrip@naver.com" onChange={handleChange} />
                </div>
                {findError && <div style={{ color: 'red' }}>{findError}</div>}
                <button type="submit">이메일 발송하기</button>
            </form>
        </div>
    );
};

export default FindPassword;
