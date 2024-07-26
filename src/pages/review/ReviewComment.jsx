import { useNavigate, useParams } from "react-router-dom";
import '../../components/css/review/ReviewComment.css';
import { useState } from "react";
import productImage from '../admin/test.jpg';
import React from "react";

const ReviewComment = () => {
  const params = useParams();
  const nav = useNavigate();
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };

  // 댓글 목록 상태
  const [comments, setComments] = useState([
    { id: 1, author: '김길동', content: '후기좋아요', date: '2024.07.25', isEditing: false, showReply: false, replyContent: '' },
    { id: 2, author: '이길동', content: '후기좋아요', date: '2024.07.25', isEditing: false, showReply: false, replyContent: '' },
    { id: 3, author: '박길동', content: '후기좋아요', date: '2024.07.25', isEditing: false, showReply: false, replyContent: '' },
  ]);

  const handleEditToggle = (id) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === id) {
          return { ...comment, isEditing: !comment.isEditing };
        }
        return comment;
      });
    });
  };

  const handleReplyToggle = (id) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === id) {
          return { ...comment, showReply: !comment.showReply };
        }
        return comment;
      });
    });
  };

  return (
    <>
      <div className='ReviewComment'>
        <input type="hidden" id="no" name="no" />
        <table>
          <tbody>
            <tr>
              <td>투어</td>
              <td>투어1</td>
              <td>작성자</td>
              <td colSpan={2}>홍길동</td>
            </tr>
            <tr>
              <td>제목</td>
              <td>바다가자 솔직투어입니다</td>
              <td>조회/좋아요수</td>
              <td>100</td>
              <td>12</td>
            </tr>
            <tr>
              <td colSpan={5}>
                <textarea readOnly value="djskdsjhdfkdsjsdkdjsfkdsjfkdjfkjfljfldsjfldsjfldjslf" />
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                <img src={productImage} alt="" />
                <img src={productImage} alt="" />
                <img src={productImage} alt="" />
                <img src={productImage} alt="" />
                <img src={productImage} alt="" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="comment-container">
        <div className="comment-form">
          <div onClick={handleLike}>
            {like ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
            )}
          </div>
          <textarea rows="1" placeholder="댓글을 입력하세요..." />
          <button id="replyButton">댓글 작성</button>
        </div>
        <div className="comment-list">
          <table className="commentTable">
            <tbody>
              {comments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <tr>
                    <td>{comment.author}</td>
                    {comment.isEditing ? (
                      <td>
                        <input
                          type="text"
                          value={comment.content}
                          onChange={(e) => setComments(prevComments => prevComments.map(c => c.id === comment.id ? { ...c, content: e.target.value } : c))}
                        />
                      </td>
                    ) : (
                      <td>{comment.content}</td>
                    )}
                    <td>{comment.date}</td>
                    <td>
                      {comment.isEditing ? (
                        <button id="saveButton" >저장</button>
                      ) : (
                        <button id="normalButton" onClick={() => handleEditToggle(comment.id)}>수정</button>
                      )}
                    </td>
                    <td><button id="normalButton">삭제</button></td>
                    <td><button id="normalButton" onClick={() => handleReplyToggle(comment.id)}>답글</button></td>
                    <td>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </td>
                    <td>3</td>
                  </tr>
                  {comment.showReply && (
                    <tr>
                      <td>작성자</td>
                      <td colSpan={5}>
                        <input type="text" placeholder="답글을 입력하세요..." size={100} />
                      </td>
                      <td colSpan={2}>
                        <button id="replyButton" >답글 추가</button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modifyButton">
          <button id="modifyButton" onClick={() => { nav(`/reviewModify/${params.no}`) }}>수정</button>
          <button id="cancelButton" onClick={() => { nav(-1) }}>취소</button>
          <button id="deleteButton">삭제</button>
        </div>
      </div>
    </>
  );
};

export default ReviewComment;
