import React, { useState } from 'react';
import '../../components/css/csr/FAQ.css';

const FAQ = () => {
    const [postsPerPage, setPostsPerPage] = useState(30);
    const posts = [
        {
            id: 1,
            title: '낙엽보러 떠나요 투어 두번째날에 비가 온다는데 괜찮나요?',
            author: 'kss123',
            date: '24/07/22',
            views: 100,
            recommendations: 20,
        },
        { id: 2, title: '0번 굿즈에 대하여 문의', author: 'jyjyjy5', date: '23/05/28', views: 44 },
        { id: 3, title: '0번 굿즈에 대하여 문의', author: 'jyjyjy5', date: '23/05/28', views: 44 },
        { id: 4, title: '0번 굿즈에 대하여 문의', author: 'jyjyjy5', date: '23/05/28', views: 44 },
        { id: 5, title: '0번 굿즈에 대하여 문의', author: 'jyjyjy5', date: '23/05/28', views: 44 },
        { id: 6, title: '0번 굿즈에 대하여 문의', author: 'jyjyjy5', date: '23/05/28', views: 44 },
        { id: 7, title: '0번 굿즈에 대하여 문의', author: 'jyjyjy5', date: '23/05/28', views: 44 },
        { id: 8, title: '0번 굿즈에 대하여 문의', author: 'jyjyjy5', date: '23/05/28', views: 44 },
        { id: 9, title: '0번 굿즈에 대하여 문의', author: 'jyjyjy5', date: '23/05/28', views: 44 },
    ];

    const handlePostsPerPageChange = (event) => {
        setPostsPerPage(Number(event.target.value));
    };

    return (
        <div className="qna_container">
            <div className="qna_box">
                <header className="qna_header">
                    <h1>QnA</h1>
                    <div>
                        {' '}
                        <select className="qna_posts_per_page" value={postsPerPage} onChange={handlePostsPerPageChange}>
                            <option value={30}>30개</option>
                            <option value={50}>50개</option>
                            <option value={70}>70개</option>
                        </select>
                        <button className="qna_write_button">글쓰기</button>
                    </div>
                </header>

                <table className="qna_posts_table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.slice(0, postsPerPage).map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.author}</td>
                                <td>{post.date}</td>
                                <td>{post.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <footer className="qna_footer">
                    <div className="qna_pagination">
                        <span>1</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default FAQ;
