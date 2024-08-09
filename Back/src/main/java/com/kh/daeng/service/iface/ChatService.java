package com.kh.daeng.service.iface;


import java.util.List;

import org.springframework.web.socket.WebSocketSession;

import com.kh.daeng.domain.dto.chat.ChatMessage;
import com.kh.daeng.domain.dto.chat.ChatRoom;



public interface ChatService {
    List<ChatRoom> findAllRoom();
    ChatRoom findRoomById(String roomId);
    ChatRoom createRoom(String name);
    <T> void sendMessage(WebSocketSession session, T message);
    void saveChat(ChatMessage chatMessage);
    List<ChatMessage> findChatByRoomId(String roomId);
}

