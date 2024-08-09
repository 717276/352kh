import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/css/login/SelectTm.css';

const themes = [
    {
        id: 'pf_rest',
        name: '힐링',
        description: '각종 신경쓸거 다 치우고 호텔에서 반려견과 함께 편히 쉬어봐요.',
        image: '/src/images/theme/hotel.png',
    },
    {
        id: 'pf_sport',
        name: '스포츠',
        description: '반려견과 함께 할수있는 스포츠를 즐겨요!',
        image: '/src/images/theme/sports.png',
    },
    {
        id: 'pf_cafe',
        name: '여유',
        description: '분위기 좋은 카페에서 반려견과 시간을 보내는건 어떠세요?',
        image: '/src/images/theme/cafe.png',
    },
    {
        id: 'pf_walk',
        name: '산책',
        description: '반려견과 함께 걸어봐요! 산책위주로 짜여진 코스입니다.',
        image: '/src/images/theme/walking.png',
    },
    {
        id: 'pf_spot',
        name: '명소',
        description: '반려견과 함께 역사와 유적지를 탐방해봐요.',
        image: '/src/images/theme/spot.png',
    },
];

const SelectTm = () => {
    const [selectedTheme, setSelectedTheme] = useState(themes[0]);
    const [selectedPreferences, setSelectedPreferences] = useState({
        pf_rest: false,
        pf_sport: false,
        pf_cafe: false,
        pf_walk: false,
        pf_spot: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        // 세션에서 유저 정보를 가져옴
        const user = JSON.parse(sessionStorage.getItem('user'));
        const dog = JSON.parse(sessionStorage.getItem('dog'));
        if (!user || !dog) {
            // 유저나 개 정보가 없으면 회원가입 페이지로 리디렉션
            navigate('/register');
        }
    }, [navigate]);

    const handleThemeClick = (theme) => {
        setSelectedTheme(theme);
    };

    const handleCheckboxChange = (themeId) => {
        setSelectedPreferences((prevPreferences) => ({
            ...prevPreferences,
            [themeId]: !prevPreferences[themeId],
        }));
    };

    const updatePreferences = async () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const dog = JSON.parse(sessionStorage.getItem('dog'));
        const preferences = selectedPreferences;

        const userInfo = {
            ...user,
            preferences,
            dogName: dog.dogName,
            breed: dog.breed,
            size: dog.size,
        };

        try {
            const response = await fetch('http://localhost:8080/api/members/finalizeRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });
            if (response.ok) {
                console.log('Preferences updated successfully');
                alert('회원가입 완료');
                navigate('/');
            } else {
                console.error('Failed to update preferences');
            }
        } catch (error) {
            console.error('There was an error updating the preferences!', error);
        }
    };

    return (
        <div className="travel-container" style={{ backgroundImage: `url(${selectedTheme.image})` }}>
            <div className="select_box">
                <div>
                    <span className="tms_title">선호 여행 테마 선택</span>
                </div>
                <div className="theme-info">
                    <h1>{selectedTheme.name}</h1>
                    <p>{selectedTheme.description}</p>
                </div>
                <div className="theme-buttons">
                    {themes.map((theme) => (
                        <button key={theme.id} className="theme-button" onClick={() => handleThemeClick(theme)}>
                            {theme.name}
                        </button>
                    ))}
                </div>
                <div className="checkbox-section">
                    {themes.map((theme) => (
                        <label key={theme.id} className="theme-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedPreferences[theme.id]}
                                onChange={() => handleCheckboxChange(theme.id)}
                            />
                            <span>{theme.name}</span>
                        </label>
                    ))}
                </div>

                <button className="selectButton" onClick={updatePreferences}>
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default SelectTm;
