import React, { useState, useEffect } from 'react';
import '../../../components/css/chat/ChatRoomList.css';

const ChatRoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken')); // accessToken 상태 추가

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:8080/chat', {
                    method: 'GET', // GET 요청
                    headers: {
                        Authorization: `${accessToken}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    credentials: 'include', // 쿠키를 포함하여 요청
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
    }, []);

    const openChatPopup = (roomId) => {
        window.open(`/chat/room/${roomId}`, '_blank', 'width=800,height=600');
    };

    return (
        <div className="chat-room">
            <h1 className="chat-room-title">Chat Rooms</h1>
            <ul className="chat-room-list">
                {rooms.map((room) => (
                    <li key={room.roomId} className="chat-room-list-item">
                        <button onClick={() => openChatPopup(room.roomId)} className="chat-room-button">
                            {room.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoomList;