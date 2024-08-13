package com.kh.daeng.service;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.daeng.domain.dto.chat.ChatMessage;
import com.kh.daeng.domain.dto.chat.ChatRoom;
import com.kh.daeng.mapper.ChatMapper;
import com.kh.daeng.service.iface.ChatService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {
    private static final Logger logger = LoggerFactory.getLogger(ChatServiceImpl.class);
        
    @Autowired
    private ObjectMapper objectMapper;  
    private Map<Integer, ChatRoom> chatRooms;
    @Autowired
    private ChatMapper chatMapper;
    
    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    @Override
    public List<ChatRoom> findAllRoom() {
    	List<ChatRoom> rList =  chatMapper.findAllChatRooms();
    	for(ChatRoom data : rList) {
    		chatRooms.put(data.getRoom_id(), data);
    	}
        return rList;
    }
    
    
    @Override
    @Transactional
    public ChatRoom createRoom(String room_name, int m_no) {        
        ChatRoom chatRoom = new ChatRoom(m_no, room_name);                
        chatMapper.insertChatRoom(chatRoom.getRoom_name(), m_no);
        chatRooms.put(m_no, chatRoom);
        return chatRoom;
    }

    @Override
    public <T> void sendMessage(WebSocketSession session, T message) {
        try {            
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
            }
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
    }

	@Override
	public void saveChat(ChatMessage chatMessage) {
		chatMapper.insertChat(chatMessage);
		
	}
	@Override
    public ChatRoom findRoomById(int roomId) {    	
        return chatMapper.findRoomById(roomId);
    }	
	@Override
	public List<ChatMessage> findChatByRoomId(String roomId) {		
		return chatMapper.findChatByRoomId(roomId);
	}
}
