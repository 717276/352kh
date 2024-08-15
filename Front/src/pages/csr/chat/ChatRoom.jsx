import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../../components/css/chat/ChatRoom.css';
import { jwtDecode } from 'jwt-decode';
const ChatRoom = () => {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Token decoding to get userName
        try {
            const decodedToken = jwtDecode(accessToken);
            setUserName(decodedToken.userName);
        } catch (err) {
            console.error('Failed to decode token:', err);
        }

        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/chat/messages/${roomId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch chat messages');
                }

                const data = await response.json();
                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    throw new Error('Chat messages are not in an array format');
                }
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };

        fetchMessages();

        // Initialize WebSocket connection
        const socket = new WebSocket(`ws://localhost:8080/ws/chat`);

        socket.onopen = () => {
            console.log('Connected to the WebSocket server');
            setWs(socket);
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
        };

        socket.onerror = (error) => {
            console.error('WebSocket error observed:', error.message);
        };

        return () => {
            socket.close();
        };
    }, [roomId, accessToken]);

    const sendMessage = async () => {
        const decodedToken = jwtDecode(accessToken);

        if (ws && message.trim() !== '') {
            const chatMessage = {
                type: 'TALK',
                roomId: roomId,
                sender: decodedToken.userName,
                message: message,
                m_no: decodedToken.userNo,
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
        <div className="chat_room_container">
            <h2 className="chat_room_title">1:1 채팅방</h2>
            <div className="chat_room_messages">
                {Array.isArray(messages) && messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat_message ${
                                msg.sender === userName ? 'chat_message_user' : 'chat_message_other'
                            }`}
                        >
                            <span className="chat_message_sender">{msg.sender}:</span> {msg.message}
                        </div>
                    ))
                ) : (
                    <p>No messages yet</p>
                )}
            </div>
            <div className="chat_room_input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="chat_input_field"
                />
                <button onClick={sendMessage} className="chat_send_button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;