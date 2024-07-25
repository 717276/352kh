import React, { useState, useEffect } from 'react';
import '../../components/css/login/Register.css';

const Register = () => {
    const [zonecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const completeHandler = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);
        setAddress(address);
    };

    const handleClick = () => {
        new window.daum.Postcode({
            oncomplete: completeHandler,
        }).open();
    };

    const inputChangeHandler = (event) => {
        setDetailedAddress(event.target.value);
    };

    return (
        <div className="register-container">
            <input type="text" name="userName" id="userName" placeholder="이름" className="input-field" />
            <input type="text" name="userId" id="userId" placeholder="ID" className="input-field" />
            <input type="password" name="userPW" id="userPW" placeholder="PASSWORD" className="input-field" />
            <input type="email" name="email" id="email" placeholder="E - MAIL" className="input-field" />
            <input type="tel" name="pNum" id="pNum" placeholder="전화번호" className="input-field" />
            <button type="button" onClick={handleClick} className="addressSelect">
                주소 찾기
            </button>
            <input type="text" value={zonecode} readOnly placeholder="우편번호" className="input-field" />
            <input type="text" value={address} readOnly placeholder="주소" className="input-field" />

            <input
                value={detailedAddress}
                onChange={inputChangeHandler}
                placeholder="상세 주소"
                className="input-field"
            />
            <br />
            <input type="button" value="회원가입" className="register-button" />
        </div>
    );
};

export default Register;
