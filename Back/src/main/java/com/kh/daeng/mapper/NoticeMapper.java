package com.kh.daeng.mapper;

import java.util.List;

import com.kh.daeng.domain.dto.board.Notice;

public interface NoticeMapper {
    List<Notice> getAllNotice() throws Exception;
    void insertNotice(Notice notice) throws Exception;
    Notice getNoticeById(int faqId) throws Exception;
	void updateNotice(Notice notice);	
	void deleteFaq(int p);
}