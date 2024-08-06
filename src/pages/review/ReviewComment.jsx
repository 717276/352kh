import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../components/css/review/ReviewComment.css';
import productImage from '../admin/test.jpg';
import Modal from './Modal';

const ReviewComment = () => {
  const { arNo } = useParams();
  const nav = useNavigate();
  const [like, setLike] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [items, setReviewList] = useState({});
  const [comments, setCommentList] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [imageList, setImageList] = useState([]);

  const handleLike = () => setLike(!like);
  const handleImageClick = (src) => {
    setModalImageSrc(src);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleEditClick = (comment) => {
    setEditingComment(comment.cNo);
    setEditedContent(comment.ccontent);
  };

  const handleSaveClick = (comment) => {
    // Save logic here
    // For example, you might call a function to update the comment in your backend
    console.log(`Saving comment ${comment.cNo} with content: ${editedContent}`);
    setEditingComment(null);
  };

  const handleInputChange = (event) => {
    setEditedContent(event.target.value);
  };

  const handleReplyToggle = (id) => {
    setCommentList(prevComments =>
      prevComments.map(comment =>
        comment.cNo === id ? { ...comment, showReply: !comment.showReply } : comment
      )
    );
  };

  useEffect(() => {
    const reviewUrl = `http://localhost:8080/api/reviewComment/${arNo}`;
    const imageUrl = `http://localhost:8080/api/images/${arNo}`;

    fetch(reviewUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // 데이터 확인
        console.log(data.comList || []); // 데이터 확인

        setReviewList(data);
        setCommentList(data.comList); // 댓글 목록 설정
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setCommentList([]); // 오류 발생 시 빈 배열로 설정
      });

    fetch(imageUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched image data:', data);
        setImageList(data);
      })
      .catch(error => {
        console.error('Error fetching image data:', error);
        setImageList([]);
      });

  }, [arNo]);



  useEffect(() => {
    console.log('Comments state:', comments);
  }, [comments]);

  const arTitle = useRef();
  const arContent = useRef();

  return (
    <>
      <div className='ReviewComment'>
        <input value={items.arNo || ''} readOnly />
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
              <td>
                <input ref={arTitle} value={items.arTitle || ''} readOnly />
              </td>
              <td>조회/좋아요수</td>
              <td>{items.arView}</td>
              <td>{items.arLike}</td>
            </tr>
            <tr>
              <td colSpan={5}>
                <textarea ref={arContent} value={items.arContent || ''} readOnly />
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                {imageList.length > 0 ? (
                  imageList.map((image, index) => (
                    <img key={index} src={`/images/review/${image.filename}.jpg`} onClick={() => handleImageClick(`/images/review/${image.filename}.jpg`)} />
                  ))
                ) : (
                  <p>등록된 이미지가 없습니다.</p>
                )}
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
              {comments.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>등록된 댓글이 없습니다.</td>
                </tr>
              ) : (
                comments.map(comment => (
                  <tr key={comment.cno}>
                    <td>{comment.cuserId}</td>
                    <td>
                      {editingComment === comment.cNo ? (
                        <input
                          type="text"
                          value={editedContent}
                          onChange={handleInputChange}
                        />
                      ) : (
                        comment.ccontent
                      )}
                    </td>
                    <td>{comment.ccreatedDate}</td>
                    <td><button id="normalButton" onClick={handleEditClick}>수정</button></td>
                    <td><button id="normalButton">삭제</button></td>
                    <td><button id="normalButton" onClick={() => handleReplyToggle(comment.cNo)}>답글</button></td>
                    <td>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </td>
                    <td>3</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
        <div className="modifyButton">
          <button id="modifyButton" onClick={() => nav(`/reviewModify/${arNo}`)}>수정</button>
          <button id="cancelButton" onClick={() => nav('/review')}>취소</button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} imageSrc={modalImageSrc} onClose={closeModal} />
    </>
  );
};

export default ReviewComment;

