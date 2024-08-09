package com.kh.daeng.controller.board;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.daeng.domain.dto.board.Article;
import com.kh.daeng.domain.dto.board.Comments;
import com.kh.daeng.domain.dto.util.Img;
import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.service.iface.ArticleService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class ArticleController {
	@Autowired
	private ArticleService service;

	@RequestMapping("/api/review")
	public List<Article> list() throws Exception {
		List<Article> list = service.list();
		return list;
	}

	@RequestMapping("/api/reviewComment/{ar_no}")
	public Article detail(@PathVariable(name = "ar_no") String arNo) throws Exception {
		Article article = service.detail(Integer.parseInt(arNo));
		return article;
	}

	@RequestMapping("/api/reviewComment2/{ar_no}")
	public List<Comments> getReviewComments(@PathVariable(name = "ar_no") String arNo) throws Exception {
		List<Comments> com = service.getReviewComments(Integer.parseInt(arNo));
		return com;
	}

	@RequestMapping("/api/images/{ar_no}")
	public List<Img> selectImgList(@PathVariable(name = "ar_no") String arNo) throws Exception {
		List<Img> imgList = service.selectImgList(Integer.parseInt(arNo));
		return imgList;
	}

	@RequestMapping("/api/reviewModify/{ar_no}")
	public Article detail2(@PathVariable(name = "ar_no") int arNo) throws Exception {
		Article article = service.detail2(arNo);
		return article;
	}

	@RequestMapping("/api/review/insert")
	public ResponseEntity<String> insert(@RequestParam(name = "img", required = false) MultipartFile[] img,
			@ModelAttribute Article article, HttpServletRequest request) throws Exception {

		try {
			int index = 1;
			int arNo = service.getMaxArNo();

			if (img != null && img.length > 0) {
				String path = "C:/DaengTrip/public/images/review/";
				File directory = new File(path);
				if (!directory.exists()) {
					directory.mkdirs(); // 디렉토리 생성
				}

				for (MultipartFile file : img) {
					if (file != null && !file.isEmpty()) {
						String filename = "review_" + arNo + "_" + index + ".jpg";
						File targetFile = new File(directory, filename);
						file.transferTo(targetFile);
						index++;
					}
				}
			}

			service.insert(article, index);
			return ResponseEntity.ok("성공");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류");
		}
	}

	@RequestMapping("/api/review/update")
	public ResponseEntity<String> update(@RequestParam(name = "img", required = false) MultipartFile[] img,
			@ModelAttribute Article article) throws Exception {
		try {
			service.update(article, img);
			return ResponseEntity.ok("성공");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류");
		}
	}

	@RequestMapping("/api/review/delete")
	public void delete(@RequestParam(name = "ar_no") int arNo) throws Exception {
		service.delete(arNo);
	}

	@RequestMapping("/api/comment/insert")
	public void insertCommentList(@ModelAttribute Comments comments) throws Exception {
		service.insertCommentList(comments);
	}	
	
	@RequestMapping("/api/comment/delete")
	public void deleteCommentList(@RequestParam(name = "c_no") int cNo) throws Exception {
		service.deleteCommentList(cNo);
	}
	
	@RequestMapping("/api/comment/update")
	public void updateCommentList(@ModelAttribute Comments comments) throws Exception {
		service.updateCommentList(comments);
	}
	
	@RequestMapping("/api/comment/insertReply")
	public void insertCommentReply(@ModelAttribute Comments comments) throws Exception {
		service.insertCommentReply(comments);
	}
	
	@RequestMapping("/api/review/updateLike")
	public void updateLike(@RequestParam(name = "ar_no") int arNo) throws Exception {
		service.updateLike(arNo);
	}
	@RequestMapping("/api/comment/updateLike")
	public void updateCommentLike(@RequestParam(name = "c_no") int cNo) throws Exception {
		service.updateCommentLike(cNo);
	}
	
	@RequestMapping("/api/getMyTours/{m_no}")
	public List<Tour> getMyTours(@PathVariable(name = "m_no") int mNo) throws Exception {
		System.out.println(service.getMyTours(mNo));
		List<Tour> tourList = service.getMyTours(mNo);
		return tourList;
	}
}
