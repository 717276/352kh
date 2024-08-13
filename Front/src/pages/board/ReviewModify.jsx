import '../../components/css/board/ReviewWrite.css';
import { useNavigate, useParams } from "react-router-dom";
import React, { useRef, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const ReviewModify = () => {
  const { ar_no } = useParams();
  const arTitle = useRef();
  const arContent = useRef();
  const imgRef = useRef();
  const nav = useNavigate();
  const [items, setItems] = useState({});
  const [showImages, setShowImages] = useState([]);
  const [imageList, setImageList] = useState([]);

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
    const url = `http://localhost:8080/api/reviewModify/${ar_no}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setItems(data);
        setImageList(data.img_list);
      })

  }, [ar_no]);

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
                <input type="file" ref={imgRef} multiple onChange={handleAddImages} />
              </td>
            </tr>
            <tr>
              <td id='imgtd' colSpan={5}>
                {imageList.length > 0 ? (
                  imageList.map((image, index) => (
                    <img key={index} src={`/images/review/${image.i_category}_${image.i_ref_no}_${image.i_order}.jpg`} />
                  ))
                ) : (
                  <p>등록된 이미지가 없습니다.</p>
                )}
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
              nav(`/board/review/comment/${items.ar_no}`);
              window.location.reload();
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
                nav('/board/review');
              })
            }
          }
          }>삭제</button>
          <button type="cancle" onClick={() => { nav('/board/review') }}>취소</button>
        </div>
      </div>
    </>
  );
};

export default ReviewModify;