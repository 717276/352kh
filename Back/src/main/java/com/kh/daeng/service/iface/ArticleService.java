package com.kh.daeng.service.iface;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.daeng.domain.dto.board.Article;
import com.kh.daeng.domain.dto.board.Comments;
import com.kh.daeng.domain.dto.util.Img;
import com.kh.daeng.domain.dto.tour.Tour;

public interface ArticleService {
	public List<Article> list() throws Exception;
	
	public Article detail(int arNo) throws Exception;
	
	public List<Comments> getReviewComments(int arNo) throws Exception;
	
	public Article detail2(int arNo) throws Exception;
	
	public void insert(Article article, int index) throws Exception;
	
	public void update(Article article, MultipartFile[] img) throws Exception;

	public void delete(int arNo) throws Exception;

	public int getMaxArNo() throws Exception;

	public List<Img> selectImgList(int arNo) throws Exception;

	public void insertCommentList(Comments comments) throws Exception;

	public void deleteCommentList(int cNo) throws Exception;

	public void updateCommentList(Comments comments) throws Exception;

	public void insertCommentReply(Comments comments) throws Exception;

	public void updateLike(int arNo) throws Exception;

	public void updateCommentLike(int cNo) throws Exception;

	public List<Tour> getMyTours(int mNo) throws Exception;
}
