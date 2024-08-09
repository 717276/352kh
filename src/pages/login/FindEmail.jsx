import React, { useState } from 'react';
import '../../components/css/login/FindEmail.css';
const FindEmail = () => {
    const [user, setUser] = useState({ userTel: '' });
    const [foundEmail, setFoundEmail] = useState('');
    const [findError, setFindError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/members/find_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userTel: user.userTel,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // JSON 응답을 처리합니다.
            setFoundEmail(data.userEmail);
            setFindError(''); // 이전의 에러 메시지를 초기화합니다.
        } catch (error) {
            setFoundEmail('');
            setFindError('전화번호 정보 오류 또는 이메일을 찾을 수 없습니다.');
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
        <div className="findemail-container">
            <form onSubmit={handleSubmit}>
                <div className="find_sub">
                    <div>가입 시 등록한 휴대전화 번호를 입력해주세요</div>
                </div>
                <div>
                    <h3>휴대폰 번호</h3>
                    <div className="userTel">
                        <input type="text" id="userTel" placeholder="01012345678" onChange={handleChange} />
                    </div>
                </div>

                {findError && <div style={{ color: 'red' }}>{findError}</div>}
                <button type="submit">이메일 찾기</button>
            </form>
            {foundEmail && (
                <div className="found-email">
                    <h3>찾은 이메일:</h3>
                    <p>{foundEmail}</p>
                </div>
            )}
        </div>
    );
};

export default FindEmail;
