import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../components/css/chat/ChatRoom.css';

const ChatRoom = () => {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Fetch chat messages for the room
        fetch(`http://localhost:8080/chat/messages/${roomId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch chat messages');
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    throw new Error('Chat messages are not in an array format');
                }
            })
            .catch((error) => {
                console.error('Error fetching chat messages:', error);
            });
        // Initialize WebSocket connection
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
    }, [roomId]);

    const sendMessage = () => {
        if (ws && message.trim() !== '') {
            const chatMessage = {
                type: 'TALK',
                roomId: roomId,
                sender: 'User',
                message: message,
                m_no: 1,
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
        <div className="chat-room">
            <h2 className="chat-room-current-title">1:1 채팅방</h2>
            <div className="chat-room-messages">
                {Array.isArray(messages) && messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-room-message ${
                                msg.sender === '댕트립' ? 'chat-room-message-other' : 'chat-room-message-user'
                            }`}
                        >
                            <span className="chat-room-message-sender">{msg.sender}:</span> {msg.message}
                        </div>
                    ))
                ) : (
                    <p>No messages yet</p>
                )}
            </div>
            <div className="chat-room-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="chat-room-input-field"
                />
                <button onClick={sendMessage} className="chat-room-send-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
