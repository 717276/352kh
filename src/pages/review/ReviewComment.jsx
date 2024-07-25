import { useNavigate, useParams } from "react-router-dom";
import '../../components/css/review/ReviewComment.css';
import { useState } from "react";
import productImage from '../admin/test.jpg';

const ReviewComment = ()=> {
  const params = useParams();
  const nav = useNavigate();

  // 댓글 목록 상태 예시 (실제 데이터와 연결하여 사용)
  const [comments, setComments] = useState([
    { id: 1, author: '김길동', content: '후기좋아요', date: '2024.07.25', isEditing: false },
    { id: 2, author: '이길동', content: '후기좋아요', date: '2024.07.25', isEditing: false },
    { id: 3, author: '박길동', content: '후기좋아요', date: '2024.07.25', isEditing: false },
  ]);

  const handleEditToggle = (id) => {
    // 해당 id를 가진 댓글의 수정 상태를 토글
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === id) {
          return { ...comment, isEditing: !comment.isEditing };
        }
        return comment;
      });
    });
  };

  const onSaveEdit = (id, newContent) => {
    // 수정된 내용을 저장하는 로직 (실제 서버로 전송 등)
    console.log(`Save edit for comment id ${id}: ${newContent}`);

    // 수정 상태를 해제하고 저장된 내용으로 업데이트
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === id) {
          return { ...comment, content: newContent, isEditing: false };
        }
        return comment;
      });
    });
  };

  return (
    <>
    <div className='ReviewComment'>
      {/* 리뷰 정보 표시 */}
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
              <textarea readOnly>
                djskdsjhdfkdsjsdkdjsfkdsjfkdjfkjfljfldsjfldsjfldjslf
              </textarea>
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

    {/* 댓글 목록과 입력 폼 */}
    <div className="comment-container">
      <div className="comment-form">
        <textarea rows="1" placeholder="댓글을 입력하세요..." />
        <button>댓글 작성</button>
      </div>
      <div className="comment-list">
        <table className="commentTable">
          <tbody>
            {comments.map(comment => (
              <tr key={comment.id}>
                <td>{comment.author}</td>
                {comment.isEditing ? (
                  <td>
                    <input type="text" value={comment.content} onChange={(e) => setComments(prevComments => prevComments.map(c => c.id === comment.id ? { ...c, content: e.target.value } : c))} />
                  </td>
                ) : (
                  <td>{comment.content}</td>
                )}
                <td>{comment.date}</td>
                <td>
                  {comment.isEditing ? (
                    <button onClick={() => onSaveEdit(comment.id, comment.content)}>저장</button>
                  ) : (
                    <button onClick={() => handleEditToggle(comment.id)}>수정</button>
                  )}
                </td>
                <td><button>삭제</button></td>
                <td><button>답글</button></td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                  </svg>
                </td>
                <td>3</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="modifyButton">
        <button onClick={()=>{nav(`/reviewModify/${params.no}`)}}>수정</button>
        <button onClick={()=>{nav(-1)}}>취소</button>
        <button>삭제</button>
      </div>
    </div>
    </>
  );
};

export default ReviewComment;