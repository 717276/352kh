import React, { useState, useEffect } from 'react';
import '../../components/css/csr/FAQ.css';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
    const [postsPerPage, setPostsPerPage] = useState(30);
    const [roomName, setRoomName] = useState('');
    const [response, setResponse] = useState(null);
    const [posts, setPosts] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/notice/all');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

    const handleInputChange = (e) => {
        setRoomName(e.target.value);
    };

    const handleCreateRoom = async () => {
        if (!roomName) {
            alert('Please enter a room name');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    name: roomName,
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

                <table className="qna_posts_table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.slice(0, postsPerPage).map((post) => (
                            <tr key={post.n_no} onClick={() => handlePostClick(post.n_no)}>
                                <td>{post.n_no}</td>
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

                    <div>
                        <input
                            type="text"
                            value={roomName}
                            onChange={handleInputChange}
                            placeholder="1대1 채팅 생성하기"
                        />
                        <button onClick={handleCreateRoom}>1대1 채팅 생성</button>
                        {response && (
                            <div>
                                <h2>Room Created</h2>
                                <p>Room ID: {response.roomId}</p>
                                <p>Room Name: {response.name}</p>
                            </div>
                        )}
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default FAQ;
