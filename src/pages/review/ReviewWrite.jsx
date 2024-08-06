import '../../components/css/review/ReviewWrite.css';
import { useNavigate } from "react-router-dom";
import React, { useRef } from 'react';

const ReviewWrite = () => {
  const nav = useNavigate();
  const arTitle = useRef();
  const arContent = useRef();
  const imgRef = useRef();
  return (
    <>
      <div className='ReviewWrite'>
        <input type="hidden" name="userId" id="userId" />
        <table>
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