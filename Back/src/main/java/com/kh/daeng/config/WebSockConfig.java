package com.kh.daeng.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.kh.daeng.config.web.handler.WebSockChatHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSockConfig implements WebSocketConfigurer {

	@Autowired
    private WebSockChatHandler webSockChatHandler;
    private static final Logger logger = LoggerFactory.getLogger(WebSockConfig.class);

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        logger.info("핸들러 메서드 ");
        registry.addHandler(webSockChatHandler, "/ws/chat")
                .setAllowedOrigins("*"); // 모든 출처를 허용
               
    }
}
