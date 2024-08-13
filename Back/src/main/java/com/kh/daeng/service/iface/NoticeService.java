package com.kh.daeng.service.iface;

import java.util.List;

import com.kh.daeng.domain.dto.board.Notice;


public interface NoticeService {
    void createNotice(Notice notice);
    List<Notice> findAllNotices();
    Notice findNoticeById(int faqId);
	void updateNotice(Notice notice);
	
}