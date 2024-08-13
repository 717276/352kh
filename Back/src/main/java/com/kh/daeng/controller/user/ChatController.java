package com.kh.daeng.controller.user;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/chat")
public class ChatController {
	@Autowired
	private ChatService chatService;
	private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

	@PostMapping
	public ChatRoom createRoom(@RequestParam("email") String email, @RequestParam("m_no") int m_no) {
		logger.info("방 생성 : " + email + " " + m_no);
		ChatRoom chatRoom = chatService.findRoomById(m_no);
		if (chatRoom == null) {
			return chatService.createRoom(email, m_no);
		} else {
			return chatRoom;
		}
	}

	@GetMapping
	public List<ChatRoom> findAllRoom() {
		return chatService.findAllRoom();
	}

	@GetMapping("/messages/{roomId}")
	public List<ChatMessage> getMessages(@PathVariable("roomId") String roomId) {

		List<ChatMessage> chatList = chatService.findChatByRoomId(roomId);

		return chatList;
	}

}
