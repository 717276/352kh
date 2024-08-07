import '../../components/css/review/ReviewWrite.css';
import { useNavigate, useParams } from "react-router-dom";
import React, { useRef, useEffect, useState } from 'react';

const ReviewModify = () => {
  const { arNo } = useParams();
  const arTitle = useRef();
  const arContent = useRef();
  const imgRef = useRef();
  const nav = useNavigate();
  const [items, setItems] = useState({});
  const [tours, setTours] = useState([]);
  const userId = 'hkd01';//예시

  useEffect(() => {
    const url = `http://localhost:8080/api/reviewModify/${arNo}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setItems(data);
      })

    const url2 = `http://localhost:8080/api/getMyTours/${userId}`;
    fetch(url2)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTours(data);
      })

  }, []);

  return (
    <>
      <div className='ReviewWrite'>
        <input value={items.arNo || ''} onChange={() => { }} />
        <table>
          <thead>
            <tr>
              <td>투어</td>
              <td>
                <select>
                  {tours.map((tour) => (
                    <option key={tour.tno} value={tour.tno}>{tour.ttitle}</option>
                  ))}
                </select>
              </td>
              <td>작성자</td>
              <td>홍길동</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>제목</td>
              <td colSpan={3}><input ref={arTitle} defaultValue={items.arTitle} /></td>
            </tr>
            <tr>
              <td colSpan={4}>
                <textarea ref={arContent} defaultValue={items.arContent} ></textarea>
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
            form.append('arNo', items.arNo);
            form.append('arTitle', arTitle.current.value);
            form.append('arContent', arContent.current.value);
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
              form.append('arNo', items.arNo);
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