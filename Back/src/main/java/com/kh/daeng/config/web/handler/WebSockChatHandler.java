package com.kh.daeng.config.web.handler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.daeng.domain.dto.chat.ChatMessage;
import com.kh.daeng.domain.dto.chat.ChatRoom;
import com.kh.daeng.service.iface.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class WebSockChatHandler extends TextWebSocketHandler {
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private ChatService chatService;
	private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		log.info("session " + session);
		String payload = message.getPayload();
		if (session == null) {
			return;
		}
		ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
		chatService.saveChat(chatMessage);

		ChatRoom room = chatService.findRoomById(Integer.parseInt(chatMessage.getRoomId()));
		room.handleActions(session, chatMessage, chatService);
	}
}
