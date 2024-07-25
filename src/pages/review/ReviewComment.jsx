import { useNavigate, useParams } from "react-router-dom";
import '../../components/css/review/ReviewComment.css';
import { useState } from "react";

const ReviewComment = ()=> {
  const params = useParams();
  const nav = useNavigate();
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  return (
    <>
    <div className='ReviewComment'>
      <input type="hidden" id="no" name="no" />
      <table>
        <tr>
          <td>투어</td>
          <td>투어1</td>
          <td>작성자</td>
          <td>홍길동</td>
        </tr>
        <tr>
          <td>제목</td>
          <td colSpan={3}>바다가자 솔직투어입니다</td>
        </tr>
        <tr>
          <td colSpan={4}>
            <textarea>
              djskdsjhdfkdsjsdkdjsfkdsjfkdjfkjfljfldsjfldsjfldjslf
            </textarea>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <input type="file" name="myfile"/>
          </td>          
        </tr>
      </table>
    </div>

    <div className="comment-container">
      <div className="comment-form">
        <div onClick={handleLike}>
          {like ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>
          )}          
        </div>        
        <textarea rows="1" placeholder="댓글을 입력하세요..."    />
        <button>댓글 작성</button>
      </div>
      <div className="comment-list">
        <table>
          <tr>
            <td>김길동</td>
            <td>후기좋아요</td>
          </tr>
          <tr>
            <td>이길동</td>
            <td>후기싫어요</td>
          </tr>
          <tr>
            <td>이길동</td>
            <td>후기좋아요</td>
          </tr>
        </table>
      </div>
      <div className="modifyButton">
        <button onClick={()=>{nav(`/reviewModify/${params.no}`)}}>수정</button>
        <button onClick={()=>{nav(-1)}}>취소</button>
      </div>
    </div>
    </>
  );
};

export default ReviewComment;