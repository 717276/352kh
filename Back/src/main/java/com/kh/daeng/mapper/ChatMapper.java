package com.kh.daeng.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.daeng.domain.dto.chat.ChatMessage;
import com.kh.daeng.domain.dto.chat.ChatRoom;

@Mapper
public interface ChatMapper {
    void insertChatRoom(@Param("room_Name") String room_Name,@Param("room_Id") String room_Id );
    ChatRoom findChatRoomById(String roomId);
    List<ChatRoom> findAllChatRooms();
	void insertChat(ChatMessage chatMessage);
	List<ChatMessage> findChatByRoomId (@Param("room_Id") String roomId);
}
