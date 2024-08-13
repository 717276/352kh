package com.kh.daeng.controller.board;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.daeng.domain.dto.board.Notice;
import com.kh.daeng.service.iface.NoticeService;

@RestController
@RequestMapping("/api/notice")
public class NoticeController {
    @Autowired
    private NoticeService noticeService;

    @PostMapping("/insert")
    public ResponseEntity<Map<String, Object>> createNotice(@RequestBody Map<String, Object> noticeInfo) {
        Notice notice = new Notice();
        notice.setN_title((String) noticeInfo.get("n_title"));
        notice.setN_content((String) noticeInfo.get("n_content"));
        notice.setN_category((Integer) noticeInfo.get("n_category"));
        
        noticeService.createNotice(notice);
        
        return ResponseEntity.ok(Map.of("success", true));
    }
    @PostMapping("/update")
    public ResponseEntity<Map<String, Object>> updateNotice(@RequestBody Notice notice) {
        try {
            noticeService.updateNotice(notice);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "error", e.getMessage()));
        }
    }


    @GetMapping("/all")
    public ResponseEntity<List<Notice>> getAllNotices() {
        List<Notice> notices = noticeService.findAllNotices();
        return ResponseEntity.ok(notices);
    }
    
    @GetMapping("/{faqId}")
    public ResponseEntity<Notice> getNoticeById(@PathVariable("faqId") int faqId) {
        Notice notice = noticeService.findNoticeById(faqId);
        return ResponseEntity.ok(notice);
    }
}