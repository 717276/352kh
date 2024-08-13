package com.kh.daeng.service.iface;


import java.util.List;

import org.springframework.web.socket.WebSocketSession;

import com.kh.daeng.domain.dto.chat.ChatMessage;
import com.kh.daeng.domain.dto.chat.ChatRoom;



public interface ChatService {
    List<ChatRoom> findAllRoom();
    <T> void sendMessage(WebSocketSession session, T message);
    void saveChat(ChatMessage chatMessage);
    List<ChatMessage> findChatByRoomId(String roomId);
    
    ChatRoom findRoomById(int roomId);    
	ChatRoom createRoom(String name, int m_no);
}

