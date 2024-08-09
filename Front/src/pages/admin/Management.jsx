import React, { useEffect, useState } from 'react';
import '../../components/css/admin/Management.css';

const Management = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/members'); // 백엔드 서버 주소
                const data = await response.json(); // 응답 데이터 확인
                console.log(data);
                if (Array.isArray(data)) {
                    setMembers(data);
                } else {
                    setMembers([]);
                }
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const handleDelete = async (m_no) => {
        if (window.confirm('삭제할까요?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/members/delete/${m_no}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setMembers(members.filter((member) => member.m_no !== m_no));
                } else {
                    console.error('Failed to delete member');
                }
            } catch (error) {
                console.error('Error deleting member:', error);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading members: {error.message}</p>;

    return (
        <div className="mg_container">
            <div className="mg_box">
                <div className="mg_manageMenu">
                    <ul>
                        <li>회원관리</li>
                        <li>여행관리</li>
                        <li>상품관리</li>
                        <li>분석</li>
                    </ul>
                </div>
                <div className="mg_userList">
                    <h2>회원관리 테이블</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>주소</th>
                                <th>상세주소</th>
                                <th>상세정보</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member.m_no}>
                                    <td>{member.m_name}</td>
                                    <td>{member.m_email}</td>
                                    <td>0{member.m_phone}</td>
                                    <td>{member.m_basicAddress}</td>
                                    <td>{member.m_detailAddress}</td>
                                    <td>
                                        <button>보기</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(member.m_no)}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Management;
