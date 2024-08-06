import React, { useState } from 'react';

const CreateChatRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [response, setResponse] = useState(null);

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
                alert('Failed to create room');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <div>
            <h1>Create Chat Room</h1>
            <input type="text" value={roomName} onChange={handleInputChange} placeholder="Enter room name" />
            <button onClick={handleCreateRoom}>Create Room</button>
            {response && (
                <div>
                    <h2>Room Created</h2>
                    <p>Room ID: {response.roomId}</p>
                    <p>Room Name: {response.name}</p>
                </div>
            )}
        </div>
    );
};

export default CreateChatRoom;
