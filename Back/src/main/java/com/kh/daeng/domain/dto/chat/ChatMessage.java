package com.kh.daeng.domain.dto.chat;

import java.util.Date;

import lombok.Data;

@Data
public class ChatMessage {
	public enum MessageType {
		
		ENTER, TALK
	}
	private int c_no;
	private MessageType type;
	private String roomId;
	private String sender;
	private String message;
	private int m_no;
	private Date time;
}