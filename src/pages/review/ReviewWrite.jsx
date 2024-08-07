import '../../components/css/review/ReviewWrite.css';
import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const ReviewWrite = () => {
  const nav = useNavigate();
  const arTitle = useRef();
  const arContent = useRef();
  const imgRef = useRef();
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(token);
  const userNo = decodedToken.userNo;
  const [selectedTour, setSelectedTour] = useState('');

  useEffect(() => {
    const url = `http://localhost:8080/api/getMyTours/${userNo}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setItems(data);
      })
  }, []);

  const handleTourChange = (event) => {
    setSelectedTour(event.target.value);
  };


  return (
    <>
      <div className='ReviewWrite'>
        <table>
          <tr>
            <td>투어</td>
            <td>
              <select value={selectedTour} onChange={handleTourChange}>
                <option value="">선택하세요</option>
                {items.map((tour) => (
                  <option key={tour.tno} value={tour.tno}>{tour.ttitle}</option>
                ))}
              </select>
            </td>
            <td>작성자</td>
            <td>홍길동</td>
          </tr>
          <tr>
            <td>제목</td>
            <td colSpan={3}><input type="text" ref={arTitle} /></td>
          </tr>
          <tr>
            <td colSpan={4}>
              <textarea ref={arContent}></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <input type="file" ref={imgRef} multiple />
            </td>
          </tr>
        </table>
        <div className='subButton'>
          <button type="submit" onClick={() => {
            const form = new FormData();
            form.append('arTitle', arTitle.current.value);
            form.append('arContent', arContent.current.value);
            form.append('tNo', items.tno.value);
            form.append('mNo', userNo);
            if (imgRef.current.files.length > 0) {
              Array.from(imgRef.current.files).forEach(file => {
                form.append('img', file);
              });
            }
            fetch('http://localhost:8080/api/review/insert', {
              method: 'post',
              body: form
            }).then(() => {
              nav('/review');
            });
          }}>제출하기</button>
          <button type="cancle" onClick={() => { nav('/review') }}>취소</button>
        </div>
      </div>
    </>
  );
};

export default ReviewWrite;