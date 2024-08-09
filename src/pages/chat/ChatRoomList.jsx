import React, { useState, useEffect } from 'react';
import '../../components/css/chat/ChatRoomList.css';

const ChatRoomList = () => {
    const [rooms, setRooms] = useState([]);
    // Initialize WebSocket connection
    useEffect(() => {
        fetch('http://localhost:8080/chat')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setRooms(data);
            })
            .catch((error) => {
                console.error('There was an error fetching the chat rooms!', error);
            });
    }, []);

    const openChatPopup = (roomId) => {
        window.open(`/chat/${roomId}`, '_blank', 'width=600,height=600');
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
