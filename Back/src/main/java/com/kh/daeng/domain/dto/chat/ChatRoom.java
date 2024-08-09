package com.kh.daeng.domain.dto.chat;

import java.util.HashSet;
import java.util.Set;
import org.springframework.web.socket.WebSocketSession;

import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.service.iface.ChatService;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class ChatRoom {
    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    public void handleActions(WebSocketSession session, ChatMessage chatMessage, ChatService chatService) {    	
        if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {        	
            chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
        } else {        	
            sessions.add(session);            
        }       
        
        sendMessage(chatMessage, chatService);
    }

    public <T> void sendMessage(T message, ChatService chatService) {        
        sessions.parallelStream().forEach(session -> {            
            chatService.sendMessage(session, message);
        });
    }
}
