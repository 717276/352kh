import React, { useState, useEffect } from 'react';

const ChatRoom = () => {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/chat/rooms')
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

    const connect = (roomId) => {
        try {
            const socket = new WebSocket(`ws://localhost:8080/ws/chat`);

            socket.onopen = () => {
                console.log('Connected to the WebSocket server');
                setWs(socket);
                setCurrentRoom(roomId);
            };

            socket.onmessage = (event) => {
                const receivedMessage = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            };

            socket.onclose = (event) => {
                if (event.wasClean) {
                    console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
                } else {
                    console.log('Connection died');
                }
                setWs(null);
                setCurrentRoom(null);
            };

            socket.onerror = (error) => {
                console.error('WebSocket error observed:', error.message);
                // 여기서 추가로 상태를 설정하여 오류 메시지를 UI에 표시할 수도 있습니다.
            };
        } catch (error) {
            console.error('WebSocket connection failed:', error.message);
        }
    };

    const sendMessage = () => {
        if (ws && message.trim() !== '') {
            const chatMessage = {
                type: 'TALK',
                roomId: currentRoom,
                sender: 'User',
                message: message,
            };
            try {
                ws.send(JSON.stringify(chatMessage));
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error.message);
            }
        }
    };

    return (
        <div>
            <h1>Chat Rooms</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room.room_Id}>
                        <button onClick={() => connect(room.room_Id)}>{room.room_Name}</button>
                    </li>
                ))}
            </ul>

            {currentRoom && (
                <div>
                    <h2>Chat Room: {currentRoom}</h2>
                    <div>
                        {messages.map((msg, index) => (
                            <div key={index}>
                                {msg.sender}: {msg.message}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default ChatRoom;
