package com.kh.daeng.service;

import java.io.File;
import java.io.FilenameFilter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kh.daeng.domain.dto.board.Article;
import com.kh.daeng.domain.dto.board.Comments;
import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.domain.dto.util.Img;
import com.kh.daeng.mapper.ArticleMapper;
import com.kh.daeng.service.iface.ArticleService;

@Service
public class ArticleServiceImpl implements ArticleService {

	@Autowired
	private ArticleMapper mapper;

	@Override
	public List<Article> list() throws Exception {
		return mapper.list();
	}

	@Override
	public Article detail(int arNo) throws Exception {
		// 조회수 업데이트
		mapper.updateViewCount(arNo);

		Article article = mapper.detail(arNo);

		List<Comments> comList = mapper.getReviewComments(arNo);
		article.setCom_list(comList);

		return article;
	}

	@Override
	public List<Comments> getReviewComments(int arNo) throws Exception {
		return mapper.getReviewComments(arNo);
	}

	@Override
	public Article detail2(int arNo) throws Exception {		
		return mapper.detail(arNo);
	}

	@Override
	public void insert(Article article, int index) throws Exception {
		String userid = mapper.getUserInfo(article.getM_no());
		article.setAr_userId(userid);
		mapper.insert(article);
		for (int i = 1; i < index; i++) {
			mapper.insertImg(i);
		}
	}

	@Override
	public void update(Article article, MultipartFile[] img) throws Exception {
		mapper.update(article);

		// 새 파일 저장
		int index = 1;

		if (img != null && img.length > 0) {
			// 기존 이미지 파일 삭제
			deleteFilesByPdNo(article.getAr_no());
			mapper.deleteImg(article.getAr_no());
			String path = "D:/reactTest/test/public/images/review/";
			File directory = new File(path);
			if (!directory.exists()) {
				directory.mkdirs();
			}

			for (MultipartFile file : img) {
				if (file != null && !file.isEmpty()) {
					String filename = "review_" + article.getAr_no() + "_" + index + ".jpg";
					File targetFile = new File(directory, filename);
					file.transferTo(targetFile);
					index++;
				}
			}
		}

		// 새로운 이미지 정보 DB에 추가
		for (int i = 1; i < index; i++) {
			mapper.updateImg(article.getAr_no(), i);
		}
	}

	private void deleteFilesByPdNo(int arNo) {
		String path = "D:/reactTest/test/public/images/review/";
		File directory = new File(path);

		if (directory.exists() && directory.isDirectory()) {
			FilenameFilter filter = (dir, name) -> name.contains("review_" + arNo);
			File[] files = directory.listFiles(filter);

			if (files != null) {
				for (File file : files) {
					if (file.exists()) {
						file.delete();
					}
				}
			}
		}
	}

	@Override
	public void delete(int arNo) throws Exception {
		mapper.delete(arNo);
	}

	@Override
	public int getMaxArNo() throws Exception {
		int arNo = mapper.getMaxArNo();
		return arNo;
	}

	@Override
	public List<Img> selectImgList(int arNo) throws Exception {
		return mapper.selectImgList(arNo);
	}

	@Override
	public void insertCommentList(Comments comments) throws Exception {
		String userid = mapper.getUserInfo(comments.getM_no());
		comments.setC_userId(userid);
		mapper.insertCommentList(comments);
	}

	@Override
	public void deleteCommentList(int cNo) throws Exception {
		mapper.deleteCommentList(cNo);
	}

	@Override
	public void updateCommentList(Comments comments) throws Exception {
		mapper.updateCommentList(comments);
	}

	@Override
	public void insertCommentReply(Comments comments) throws Exception {
		String userid = mapper.getUserInfo(comments.getM_no());
		comments.setC_userId(userid);
		mapper.insertCommentReply(comments);
	}

	@Override
	public void updateLike(int arNo) throws Exception {
		mapper.updateLike(arNo);
	}
	
	@Override
	public void updateCommentLike(int cNo) throws Exception {
		mapper.updateCommentLike(cNo);
	}

	@Override
	public List<Tour> getMyTours(int mNo) throws Exception {
		return mapper.getMyTours(mNo);
	}
}
