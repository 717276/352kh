import '../../components/css/board/ReviewWrite.css';
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
  const mNo = decodedToken.userNo;
  const [selectedTour, setSelectedTour] = useState('');
  const [showImages, setShowImages] = useState([]);


  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    setShowImages(imageUrlLists);
  };


  useEffect(() => {
    const url = `http://localhost:8080/api/getMyTours/${mNo}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setItems(data);
      })
  }, [mNo]);

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
                  <option key={tour.t_no} value={tour.t_no}>{tour.t_title}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>제목</td>
            <td><input type="text" ref={arTitle} /></td>
          </tr>
          <tr>
            <td colSpan={3}>
              <textarea ref={arContent}></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <input type="file" ref={imgRef} multiple onChange={handleAddImages} />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              {showImages.map((image, id) => (
                <div className='imgcontainer' key={id}>
                  <img src={image} alt={`${image}-${id}`} />
                </div>
              ))}
            </td>
          </tr>
        </table>
        <div className='subButton'>
          <button type="submit" onClick={() => {
            const form = new FormData();
            form.append('ar_title', arTitle.current.value);
            form.append('ar_content', arContent.current.value);
            form.append('t_no', selectedTour);
            form.append('m_no', mNo);
            if (imgRef.current.files.length > 0) {
              Array.from(imgRef.current.files).forEach(file => {
                form.append('img', file);
              });
            }
            fetch('http://localhost:8080/api/review/insert', {
              method: 'post',
              body: form
            }).then(() => {
              nav('/board/review');
            });
          }}>제출하기</button>
          <button type="cancle" onClick={() => { nav('/board/review') }}>취소</button>
        </div>
      </div>
    </>
  );
};

export default ReviewWrite;