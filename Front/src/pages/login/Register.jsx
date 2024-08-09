import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../components/css/login/Register.css';

const Register = () => {
    const [dogName, setDogName] = useState('');
    const [breed, setBreed] = useState('');
    const [size, setSize] = useState('');

    const [zonecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;
    const usernameRegEx = /^[가-힣]{2,6}$/; // 한글 2글자에서 6글자
    const phoneNumberRegEx = /^[0-9]*$/; // 숫자만

    const passwordCheck = (userPW) => {
        if (userPW === '') {
            setPasswordError('');
        } else if (userPW.match(passwordRegEx) === null) {
            setPasswordError('잘못된 비밀번호 형식입니다.');
        } else {
            setPasswordError('');
        }
    };

    const emailCheck = (email) => {
        if (email === '') {
            setEmailError('');
        } else if (email.match(emailRegEx) === null) {
            setEmailError('잘못된 이메일 형식입니다.');
        } else {
            setEmailError('');
        }
    };

    const usernameCheck = (name) => {
        if (name === '') {
            setUsernameError('');
        } else if (name.match(usernameRegEx) === null) {
            setUsernameError('이름은 한글 2글자에서 6글자여야 합니다.');
        } else {
            setUsernameError('');
        }
    };

    const phoneNumberCheck = (number) => {
        if (number === '') {
            setPhoneNumberError('');
        } else if (number.match(phoneNumberRegEx) === null) {
            setPhoneNumberError('전화번호는 숫자만 입력해야 합니다.');
        } else {
            setPhoneNumberError('');
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        // location.state에서 이름과 이메일 값 가져오기
        if (location.state) {
            const { googleName, googleEmail } = location.state;
            setUsername(googleName || '');
            setEmail(googleEmail || '');
        }
    }, [location.state]);

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

    const handleClickIdCheck = () => {
        fetch(`http://localhost:8080/api/members/checkId/${userId}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 409) {
                    return response.json().then((data) => {
                        throw new Error(data.message);
                    });
                } else {
                    throw new Error(`Unexpected status code: ${response.status}`);
                }
            })
            .then((data) => {
                alert(data.message);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const inputChangeHandler = (event) => {
        setDetailedAddress(event.target.value);
    };

    const handleAddressFocus = () => {
        if (!address) {
            alert('우편번호란의 주소찾기를 먼저 진행해주세요.');
            handleClick(); // 주소 찾기 버튼과 같은 동작 수행
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 입력값 검증 로직
        if (usernameError || !username) {
            alert('이름을 올바르게 입력해주세요.');
            return;
        }
        if (!userId) {
            alert('ID를 입력해주세요.');
            return;
        }
        if (passwordError || !password) {
            alert('유효한 비밀번호를 입력해주세요.');
            return;
        }
        if (emailError || !email) {
            alert('유효한 이메일을 입력해주세요.');
            return;
        }
        if (phoneNumberError || !phoneNumber) {
            alert('전화번호를 올바르게 입력해주세요.');
            return;
        }
        if (!zonecode) {
            alert('우편번호를 입력해주세요.');
            return;
        }
        if (!address) {
            alert('주소를 입력해주세요.');
            return;
        }
        if (!detailedAddress) {
            alert('상세 주소를 입력해주세요.');
            return;
        }
        if (!dogName) {
            alert('강아지 이름을 입력해주세요.');
            return;
        }
        if (!breed) {
            alert('견종을 입력해주세요.');
            return;
        }
        if (!size) {
            alert('강아지 크기를 선택해주세요.');
            return;
        }

        const user = {
            username,
            userId,
            password,
            email,
            phoneNumber,
            zonecode,
            address,
            detailedAddress,
        };
        const dog = {
            dogName,
            breed,
            size,
        };

        // 세션에 저장하고 다음 페이지로 이동
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('dog', JSON.stringify(dog));
        navigate('/selecttm');
    };

    return (
        <div className="container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="register-section">
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="이름"
                        className="input-field"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            usernameCheck(e.target.value);
                        }}
                    />
                    {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                    <div className="userIdInsert">
                        <input
                            type="text"
                            name="userId"
                            id="userId"
                            placeholder="ID"
                            className="input-field"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <button type="button" onClick={handleClickIdCheck} className="idCheck">
                            중복 체크
                        </button>
                    </div>

                    <input
                        type="password"
                        name="userPW"
                        id="userPW"
                        placeholder="PASSWORD : 대문자 특수문자 포함"
                        className="input-field"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            passwordCheck(e.target.value);
                        }}
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E - MAIL"
                        className="input-field"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            emailCheck(e.target.value);
                        }}
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    <input
                        type="tel"
                        name="pNum"
                        id="pNum"
                        placeholder="전화번호"
                        className="input-field"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            phoneNumberCheck(e.target.value);
                        }}
                    />
                    {phoneNumberError && <p style={{ color: 'red' }}>{phoneNumberError}</p>}
                    <div className="addressDetailSelect">
                        <input type="text" value={zonecode} readOnly placeholder="우편번호" className="input-field" />
                        <button type="button" onClick={handleClick} className="addressSelect">
                            주소 찾기
                        </button>
                    </div>
                    <input type="text" value={address} readOnly placeholder="주소" className="input-field" />
                    <input
                        value={detailedAddress}
                        onChange={inputChangeHandler}
                        placeholder="상세 주소"
                        className="input-field"
                        onFocus={handleAddressFocus}
                    />
                </div>

                <hr />
                <h2>개 정보</h2>
                <div className="Regdog-section">
                    <input
                        type="text"
                        name="dogName"
                        id="dogName"
                        placeholder="이름"
                        className="input-field"
                        value={dogName}
                        onChange={(e) => setDogName(e.target.value)}
                    />
                    <input
                        type="text"
                        name="breed"
                        id="breed"
                        placeholder="견종"
                        className="input-field"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                    />
                    <br />
                    <div className="radio_button">
                        <label>
                            <input
                                type="radio"
                                name="size"
                                id="size"
                                value="2"
                                onChange={(e) => setSize(e.target.value)}
                            />
                            <span>대형견</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="size"
                                id="size"
                                value="1"
                                onChange={(e) => setSize(e.target.value)}
                            />
                            <span>중형견</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="size"
                                id="size"
                                value="0"
                                onChange={(e) => setSize(e.target.value)}
                            />
                            <span>소형견</span>
                        </label>
                    </div>
                </div>

                <br />
                <input type="submit" value="다음으로" className="register-button" />
            </form>
        </div>
    );
};

export default Register;
