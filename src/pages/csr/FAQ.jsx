import React, { useState, useEffect } from 'react';
import '../../components/css/csr/FAQ.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // 여기를 수정

const getCategoryName = (category) => {
    switch (category) {
        case 0:
            return '주문 / 결제';
        case 1:
            return '회원';
        case 2:
            return '배송';
        case 3:
            return '환불';
        case 4:
            return '기타';
        default:
            return '알 수 없음';
    }
};

const FAQ = () => {
    const [postsPerPage, setPostsPerPage] = useState(30);
    const [response, setResponse] = useState(null);
    const [userName, setUserName] = useState('');
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken')); // accessToken 상태 추가
    const nav = useNavigate();

    useEffect(() => {
        if (accessToken && accessToken !== 'null') {
            try {
                const decodedToken = jwtDecode(accessToken);
                setUserName(decodedToken.userName); // 필요한 사용자 정보 추출
                console.log('토큰 null아님');
                console.log('디코드뽑아온 유저네임 :' + decodedToken.userName);
            } catch (err) {
                console.error('토큰 디코딩 실패:', err);
            }
        } else {
            console.log('토큰 null임');
        }
    }, [accessToken]);

    const fetchNotices = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/notice/all');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleCreateRoom = async () => {
        if (!userName) {
            alert('사용자 이름을 찾을 수 없습니다.');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    name: userName, // Room Name을 userName으로 설정
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setResponse(data);
                alert(`Room created: ${data.name}`);
            } else {
                const errorData = await res.json();
                alert(`Failed to create room: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    const handlePostsPerPageChange = (event) => {
        setPostsPerPage(Number(event.target.value));
    };

    const handlePostClick = (postId) => {
        nav(`/faq/${postId}`);
    };

    const handleWriteButtonClick = () => {
        nav('/faqwrite');
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const filteredPosts =
        selectedCategory !== null ? posts.filter((post) => post.n_category === selectedCategory) : posts;

    return (
        <div className="qna_container">
            <div className="qna_box">
                <header className="qna_header">
                    <h1>FAQ</h1>
                    <div>
                        <select className="qna_posts_per_page" value={postsPerPage} onChange={handlePostsPerPageChange}>
                            <option value={30}>30개</option>
                            <option value={50}>50개</option>
                            <option value={70}>70개</option>
                        </select>
                        <button className="qna_write_button" onClick={handleWriteButtonClick}>
                            글쓰기
                        </button>
                    </div>
                </header>

                <div className="category-filter">
                    <button onClick={() => handleCategoryClick(null)}>전체</button>
                    <button onClick={() => handleCategoryClick(0)}>{getCategoryName(0)}</button>
                    <button onClick={() => handleCategoryClick(1)}>{getCategoryName(1)}</button>
                    <button onClick={() => handleCategoryClick(2)}>{getCategoryName(2)}</button>
                    <button onClick={() => handleCategoryClick(3)}>{getCategoryName(3)}</button>
                    <button onClick={() => handleCategoryClick(4)}>{getCategoryName(4)}</button>
                </div>

                <table className="qna_posts_table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>카테고리</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.slice(0, postsPerPage).map((post) => (
                            <tr key={post.n_no} onClick={() => handlePostClick(post.n_no)}>
                                <td>{post.n_no}</td>
                                <td>{getCategoryName(post.n_category)}</td>
                                <td>{post.n_title}</td>
                                <td>댕트립</td>
                                <td>{new Date(post.n_createdDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <footer className="qna_footer">
                    <div className="qna_pagination">
                        <span>1</span>
                    </div>

                    {accessToken && accessToken !== 'null' && (
                        <div>
                            <button onClick={handleCreateRoom}>1대1 채팅 생성</button>
                            {response && (
                                <div>
                                    <h2>Room Created</h2>
                                    <p>Room ID: {response.roomId}</p>
                                    <p>Room Name: {response.name}</p>
                                </div>
                            )}
                        </div>
                    )}
                </footer>
            </div>
        </div>
    );
};

export default FAQ;
