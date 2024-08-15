import React, { useState, useEffect } from "react";
import "../../components/css/csr/FAQ.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // 여기를 수정
import { HTTP_STATUS } from "../../components/Auth";
const getCategoryName = (category) => {
    switch (category) {
        case 0:
            return "주문 / 결제";
        case 1:
            return "회원";
        case 2:
            return "배송";
        case 3:
            return "환불";
        case 4:
            return "기타";
        default:
            return "알 수 없음";
    }
};

const FAQ = () => {
    const [postsPerPage, setPostsPerPage] = useState(30);
    const [response, setResponse] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [userNo, setUserNo] = useState("");
    const [userRole, setUserRole] = useState("");
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [rendering, setRendering] = useState(false);
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken")
    );
    const nav = useNavigate();

    useEffect(() => {
        if (accessToken && accessToken !== "null") {
            try {
                const decodedToken = jwtDecode(accessToken);
                setUserEmail(decodedToken.userEmail); // 필요한 사용자 정보 추출
                setUserNo(decodedToken.userNo);
                setUserRole(decodedToken.role);
            } catch (err) {
                console.error("토큰 디코딩 실패:", err);
            }
        } else {
            console.log("토큰 null임");
        }
        fetchNotices();
    }, [accessToken]);

    const fetchNotices = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/notice/all");
            if (res.status === HTTP_STATUS.OK) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error("Error fetching notices:", error);
        }
    };

    const handleCreateRoom = async () => {
        if (!userEmail) {
            alert("사용자 이름을 찾을 수 없습니다.");
            return;
        }
        
        try {
            const res = await fetch("http://localhost:8080/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    email: userEmail, // Room Name을 userEmail로 설정
                    m_no: userNo,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setResponse(data);
                alert(`채팅방으로 이동합니다`);
                window.open(`/csr/chat/room/${data.room_id}`,"_blank","width=750,height=1100");
            } else {
                const errorData = await res.json();
                alert(`Failed to create room: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred");
        }
    };

    const handlePostsPerPageChange = (event) => {
        setPostsPerPage(Number(event.target.value));
    };

    const handlePostClick = (postId) => {
        nav(`faq/${postId}`);
    };

    const handleWriteButtonClick = () => {
        nav("faqwrite");
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const deleteFaq = async (post_no) => {
        console.log("Deleting FAQ with post_no:", post_no);
        try {
            const response = await fetch(`http://localhost:8080/api/notice/delete/${post_no}`, // Corrected URL
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                alert("삭제 성공");
                setPosts(posts.filter(post => post.n_no !== post_no)); 
            } else {
                alert("삭제 실패"); 
            }
        } catch (error) {
            console.error("Error:", error);
            alert("삭제 실패");
        }
    };


    const filteredPosts =
        selectedCategory !== null
            ? posts.filter((post) => post.n_category === selectedCategory)
            : posts;

    return (
        <div className="faq_container">
            <div className="faq_box">
                <header className="faq_header">
                    {accessToken && accessToken !== "null" && (
                        <div>
                            <button onClick={handleCreateRoom}>
                                <img
                                    className="ChatLogoImg"
                                    src="/public/images/util/ChatLogo.png"
                                    alt=""
                                />
                            </button>
                        </div>
                    )}
                    <h1>FAQ</h1>
                    <div>
                        <select
                            className="faq_posts_per_page"
                            value={postsPerPage}
                            onChange={handlePostsPerPageChange}
                        >
                            <option value={30}>30개</option>
                            <option value={50}>50개</option>
                            <option value={70}>70개</option>
                        </select>
                        {userRole==='ROLE_ADMIN' && (
                            <button className="faq_write_button" onClick={handleWriteButtonClick} >
                                글쓰기
                            </button>
                        )}
                    </div>
                </header>

                <div className="category-filter">
                    <button onClick={() => handleCategoryClick(null)}>전체</button>
                    <button onClick={() => handleCategoryClick(0)}>
                        {getCategoryName(0)}
                    </button>
                    <button onClick={() => handleCategoryClick(1)}>
                        {getCategoryName(1)}
                    </button>
                    <button onClick={() => handleCategoryClick(2)}>
                        {getCategoryName(2)}
                    </button>
                    <button onClick={() => handleCategoryClick(3)}>
                        {getCategoryName(3)}
                    </button>
                    <button onClick={() => handleCategoryClick(4)}>
                        {getCategoryName(4)}
                    </button>
                </div>

                <table className="faq_posts_table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>카테고리</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            {userRole === "ROLE_ADMIN" && (
                                <th className="faq_th_delete">삭제</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.slice(0, postsPerPage).map((post) => (
                            <tr key={post.n_no}>
                                <td onClick={() => handlePostClick(post.n_no)}>{post.n_no}</td>
                                <td>{getCategoryName(post.n_category)}</td>
                                <td>{post.n_title}</td>
                                <td>댕트립</td>
                                <td>{new Date(post.n_createdDate).toLocaleDateString()}</td>                                
                                {userRole === "ROLE_ADMIN" && (
                                <td>
                                    <button onClick={() => deleteFaq(post.n_no)}>삭제</button>
                                </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <footer className="faq_footer">
                    <div className="faq_pagination">
                        <span>1</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default FAQ;
