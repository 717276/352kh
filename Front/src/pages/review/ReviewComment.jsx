import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../components/css/review/ReviewComment.css';
import Modal from './Modal';
import { jwtDecode } from "jwt-decode";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const ReviewComment = () => {
  const { arNo } = useParams();
  const nav = useNavigate();
  const arTitle = useRef();
  const arContent = useRef();
  const [like, setLike] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [items, setReviewList] = useState({});
  const [comments, setCommentList] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [imageList, setImageList] = useState([]);
  const cContent = useRef();
  const [replyTo, setReplyTo] = useState(null);
  const token = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(token);
  const mNo = decodedToken.userNo;

  const isUserAllowedToEdit = mNo === items.m_no;

  const handleLike = () => {
    setLike(!like);
    const form = new FormData();
    form.append('ar_no', arNo);
    fetch('http://localhost:8080/api/review/updateLike', {
      method: 'post',
      body: form
    })
      .then(() => {
        window.location.reload();
      })
  };

  const handleImageClick = (src) => {
    setModalImageSrc(src);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleEditClick = (comment) => {
    if (!isUserAllowedToEdit) {
      alert('작성한 댓글이 아닙니다.');
      return;
    } else {
      setEditingComment(comment.c_no);
      setEditedContent(comment.c_content);
    }
  };

  const handleSaveClick = (comment) => {
    const form = new FormData();
    form.append('c_no', comment.c_no);
    form.append('c_content', editedContent);

    fetch('http://localhost:8080/api/comment/update', {
      method: 'post',
      body: form
    })
      .then(() => {
        setCommentList(prevComments =>
          prevComments.map(c =>
            c.c_no === comment.c_no ? { ...c, c_content: editedContent } : c
          )
        );
        setEditingComment(null);
        window.location.reload();
      })
  };

  const handleInputChange = (event) => {
    setEditedContent(event.target.value);
  };

  const handleReplyToggle = (id) => {
    setReplyTo(replyTo === id ? null : id);
  };

  const handleReplySubmit = (parentId) => {
    const parentComment = comments.find(comment => comment.c_no === parentId);
    const deptLevel = parentComment ? parentComment.c_dept : 1;

    const form = new FormData();
    form.append('ar_no', items.ar_no);
    form.append('c_no', parentId);
    form.append('c_content', cContent.current.value);
    form.append('m_no', mNo);
    form.append('c_dept', deptLevel + 1);
    fetch('http://localhost:8080/api/comment/insertReply', {
      method: 'POST',
      body: form,
    })
      .then(() => {
        cContent.current.value = '';
        setReplyTo(null);
        window.location.reload();
      })
  };


  useEffect(() => {
    const reviewUrl = `http://localhost:8080/api/reviewComment/${arNo}`;
    const imageUrl = `http://localhost:8080/api/images/${arNo}`;

    fetch(reviewUrl)
      .then(response => response.json())
      .then(data => {
        setReviewList(data);
        setCommentList(data.comList || []);
      })
      .catch(error => {
        setCommentList([]);
      });

    fetch(imageUrl)
      .then(response => response.json())
      .then(data => {
        setImageList(data);
      })
      .catch(error => {
        setImageList([]);
      });
  }, [arNo]);

  return (
    <>
      <div className='ReviewComment'>
        <input type='hidden' value={items.ar_no} readOnly />
        <table>
          <tbody>
            <tr>
              <td>투어</td>
              <td>{items.t_title}</td>
              <td>작성자</td>
              <td colSpan={2}>{items.ar_userId}</td>
            </tr>
            <tr>
              <td>제목</td>
              <td>
                {items.ar_title || ''}
              </td>
              <td>조회/좋아요수</td>
              <td>{items.ar_view}</td>
              <td>{items.ar_like}</td>
            </tr>
            <tr>
              <td colSpan={5}>
                <textarea ref={arContent} value={items.ar_content || ''} readOnly />
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                {imageList.length > 0 ? (
                  imageList.map((image, index) => (
                    <img key={index} src={`/images/review/${image.FILENAME}.jpg`} onClick={() => handleImageClick(`/images/review/${image.filename}.jpg`)} />
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
          <textarea ref={cContent} rows="1" placeholder="댓글을 입력하세요..." />
          <button id="replyButton" onClick={() => {
            const form = new FormData();
            form.append('ar_no', items.ar_no);
            form.append('c_content', cContent.current.value);
            form.append('m_no', mNo);
            fetch('http://localhost:8080/api/comment/insert', {
              method: 'post',
              body: form
            }).then(() => {
              window.location.reload();
            });
          }}>댓글 작성</button>
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
                  <React.Fragment key={comment.c_no}>
                    <tr>
                      <td style={{ paddingLeft: `${comment.c_dept * 20}px` }}>{comment.c_userId}</td>
                      <td style={{ paddingLeft: `${comment.c_dept * 20}px` }}>
                        {editingComment === comment.c_no ? (
                          <input
                            type="text"
                            value={editedContent}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                          />
                        ) : (
                          comment.c_content
                        )}
                      </td>
                      <td>{formatDate(comment.c_createdDate)}</td>
                      <td>
                        {editingComment === comment.c_no ? (
                          <button id="normalButton" onClick={() => handleSaveClick(comment)}>저장</button>
                        ) : (
                          <button id="normalButton" onClick={() => handleEditClick(comment)}>수정</button>
                        )}
                      </td>
                      <td>
                        <button id="normalButton" onClick={() => {
                          if (!isUserAllowedToEdit) {
                            alert('작성한 댓글이 아닙니다.');
                            return;
                          } else {
                            if (window.confirm('삭제할까요?')) {
                              const form = new FormData();
                              form.append('c_no', comment.c_no);
                              fetch('http://localhost:8080/api/comment/delete', {
                                method: 'POST',
                                body: form
                              }).then(() => {
                                window.location.reload();
                              });
                            }
                          }
                        }
                        }>삭제</button>
                      </td>
                      <td>
                        <button id="normalButton" onClick={() => handleReplyToggle(comment.c_no)}>
                          답글
                        </button>
                      </td>
                      <td onClick={() => {
                        const form = new FormData();
                        form.append('c_no', comment.c_no);
                        fetch('http://localhost:8080/api/comment/updateLike', {
                          method: 'post',
                          body: form
                        })
                          .then(() => {
                            window.location.reload();
                          })
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                      </td>
                      <td>{comment.c_like}</td>
                      <td hidden>{comment.c_dept}</td>
                    </tr>
                    {/* 답글 입력 행 */}
                    {replyTo === comment.c_no && (
                      <tr>
                        <td colSpan="7">
                          <input type="text" placeholder="답글을 입력하세요..." ref={cContent} />
                          <button id="normalButton" onClick={() => handleReplySubmit(comment.c_no)} >
                            답글 작성
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="modifyButton">
          {isUserAllowedToEdit && (
            <button id="modifyButton" onClick={() => nav(`/reviewModify/${arNo}`)}>수정</button>
          )}
          <button id="cancelButton" onClick={() => nav('/review')}>취소</button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} imageSrc={modalImageSrc} onClose={closeModal} />
    </>
  );
};

export default ReviewComment;
