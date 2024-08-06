import '../../components/css/review/ReviewWrite.css';
import { useNavigate, useParams } from "react-router-dom";
import React, { useRef, useEffect, useState } from 'react';

const ReviewModify = () => {
  const { arNo } = useParams();
  const nav = useNavigate();
  const [items, setItems] = useState({});



  useEffect(() => {
    const url = `http://localhost:8080/api/reviewModify/${arNo}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setItems(data);
      })
  }, []);

  const arTitle = useRef();
  const arContent = useRef();

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
                  <option value="tour1">투어 1</option>
                  <option value="tour2">투어 2</option>
                  <option value="tour3">투어 3</option>
                  <option value="tour4">투어 4</option>
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
                <input type="file" name="myfile" />
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