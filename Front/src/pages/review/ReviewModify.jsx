import '../../components/css/review/ReviewWrite.css';
import { useNavigate, useParams } from "react-router-dom";
import React, { useRef, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const ReviewModify = () => {
  const { arNo } = useParams();
  const arTitle = useRef();
  const arContent = useRef();
  const imgRef = useRef();
  const nav = useNavigate();
  const [items, setItems] = useState({});
  const [tours, setTours] = useState([]);
  const token = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(token);
  const mNo = decodedToken.userNo;

  useEffect(() => {
    const url = `http://localhost:8080/api/reviewModify/${arNo}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setItems(data);
      })

    //   const url2 = `http://localhost:8080/api/getMyTours/${mNo}`;
    //   fetch(url2)
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(data => {
    //       setTours(data);
    //     })

  }, [arNo]);

  return (
    <>
      <div className='ReviewWrite'>
        <input type='hidden' value={items.ar_no || ''} onChange={() => { }} />
        <table>
          <thead>
            <tr>
              <td>투어</td>
              <td>
                {items.t_title}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>제목</td>
              <td><input ref={arTitle} defaultValue={items.ar_title} /></td>
            </tr>
            <tr>
              <td colSpan={3}>
                <textarea ref={arContent} defaultValue={items.ar_content} ></textarea>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <input type="file" ref={imgRef} multiple />
              </td>
            </tr>
          </tbody>
        </table>
        <div className='subButton'>
          <button type="submit" onClick={() => {
            const form = new FormData();
            form.append('ar_no', items.ar_no);
            form.append('ar_title', arTitle.current.value);
            form.append('ar_content', arContent.current.value);
            if (imgRef.current.files.length > 0) {
              Array.from(imgRef.current.files).forEach(file => {
                form.append('img', file);
              });
            }
            fetch('http://localhost:8080/api/review/update', {
              method: 'post',
              body: form
            }).then(() => {
              nav(`/reviewComment/${items.arNo}`);
            });
          }}>수정</button>
          <button id="deleteButton" onClick={() => {
            if (window.confirm('삭제할까요?')) {
              const form = new FormData();
              form.append('ar_no', items.ar_no);
              fetch('http://localhost:8080/api/review/delete', {
                method: 'post',
                body: form
              }).then(() => {
                nav('/review');
              })
            }
          }
          }>삭제</button>
          <button type="cancle" onClick={() => { nav('/review') }}>취소</button>
        </div>
      </div>
    </>
  );
};

export default ReviewModify;