package com.kh.daeng.controller.user;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.daeng.domain.dto.chat.ChatMessage;
import com.kh.daeng.domain.dto.chat.ChatRoom;
import com.kh.daeng.service.iface.ChatService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {
    private ChatService chatService;
    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
    @PostMapping
    public ChatRoom createRoom(@RequestParam("name") String name) {
    	
    	 logger.info("방 생성 : "+ name);
        return chatService.createRoom(name);
    }

    @GetMapping
    public List<ChatRoom> findAllRoom() {
        return chatService.findAllRoom();
    }
    
    @GetMapping("/messages/{roomId}")
    public List<ChatMessage> getMessages(@PathVariable("roomId") String roomId) {
    	logger.info("채팅 긁어오기 진입");
    	logger.info("룸 아이디 : " + roomId);
        return chatService.findChatByRoomId(roomId);
    }
    
  
   
}
