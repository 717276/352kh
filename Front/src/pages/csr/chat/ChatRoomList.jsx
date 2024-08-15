import React, { useState, useEffect } from 'react';
import '../../../components/css/chat/ChatRoomList.css'; // CSS 파일 경로 수정
import { useNavigate } from 'react-router-dom';

const ChatRoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/chat', {
                    method: 'GET',
                    headers: {
                        Authorization: `${accessToken}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('There was an error fetching the chat rooms!', error);
            }
        };

        fetchRooms();
    }, [accessToken]);

    const openChatPopup = (roomId) => {
        window.open(`/csr/chat/room/${roomId}`, '_blank', 'width=800,height=600');
    };

    return (
        <div className="chat_room_container">
            <div className="side_menu">
                <ul>
                    <li onClick={() => navigate('/admin/')}>회원관리</li>
                    <li onClick={() => navigate('/admin/tripList')}>여행관리</li>
                    <li onClick={() => navigate('/admin/productList')}>상품관리</li>
                    <li onClick={() => navigate('/admin/chart')}>분석</li>
                    <li onClick={() => navigate('/admin/chat/list')}>Faq관리</li>
                </ul>
            </div>
            <div className="main_content">
                <div className="chat_room_list">
                    <h2>방 목록</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>방 이름</th>
                                <th>입장</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room,idx) => (
                                <tr key={idx}>
                                    <td>{room.room_name}</td>
                                    <td>
                                        <button onClick={() => openChatPopup(room.room_id)}>Open</button>
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

export default ChatRoomList;