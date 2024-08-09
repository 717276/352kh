package com.kh.daeng.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.domain.dto.board.Article;
import com.kh.daeng.domain.dto.board.Comments;
import com.kh.daeng.domain.dto.util.Img;

public interface ArticleMapper {
	public List<Article> list() throws Exception;
	
	public Article detail(int arNo) throws Exception;
	
	public void insert(Article article) throws Exception;
	
	public void update(Article article) throws Exception;

	public void delete(int arNo) throws Exception;

	public void updateViewCount(int arNo) throws Exception;

	public List<Comments> getReviewComments(int arNo) throws Exception;

	public int getMaxArNo() throws Exception;

	public void insertImg(int index);
	
	public void deleteImg(int arNo);

	public void updateImg(@Param("arNo") int arNo, @Param("index") int index);

	public List<Img> selectImgList(int arNo) throws Exception;

	public void insertCommentList(Comments comments) throws Exception;

	public void deleteCommentList(int cNo) throws Exception;

	public void updateCommentList(Comments comments) throws Exception;

	public void insertCommentReply(Comments comments) throws Exception;

	public void updateLike(int arNo) throws Exception;

	public void updateCommentLike(int cNo) throws Exception;

	public List<Tour> getMyTours(int mNo) throws Exception;

	public String getUserInfo(int mNo) throws Exception;	
	
}
