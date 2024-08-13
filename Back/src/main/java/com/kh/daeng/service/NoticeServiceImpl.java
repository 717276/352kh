package com.kh.daeng.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.daeng.domain.dto.board.Notice;
import com.kh.daeng.mapper.NoticeMapper;
import com.kh.daeng.service.iface.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	private NoticeMapper noticeMapper;

	@Override
	public void createNotice(Notice notice) {
		try {
			noticeMapper.insertNotice(notice);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public List<Notice> findAllNotices() {
		List<Notice> list = null;
		try {
			list = noticeMapper.getAllNotice();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public Notice findNoticeById(int faqId) {
		Notice notice = null;
		try {
			notice = noticeMapper.getNoticeById(faqId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return notice;
	}

	 @Override
	    public void updateNotice(Notice notice) {
	        noticeMapper.updateNotice(notice);
	    }
}