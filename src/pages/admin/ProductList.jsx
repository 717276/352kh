import React, { useState, useEffect } from 'react';
import '../../components/css/admin/ProductList.css';
import { useNavigate } from 'react-router-dom';
import Page from '../Pagination';

const ProductList = () => {
  const nav = useNavigate();
  const [items, setItemsList] = useState([]);
  const [error, setError] = useState(null); // 오류 상태 추가
  const token = localStorage.getItem('accessToken');
  const url = 'http://localhost:8080/api/admin/productList';

  useEffect(() => {
    getList(url);
  }, []);

  // const getList = (url) => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setItemsList(data);
  //     })
  // };

  const getList = (url) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // JWT 토큰 추가
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(token);
        setItemsList(data);
      })
      .catch((err) => {
        setError(err.message); // 오류 메시지 상태 업데이트
      });
  };

  // 페이징
  const [page, setPage] = useState(1);
  const totalItems = items.length;
  const totalPage = Math.ceil(totalItems / 10);
  const currentPageData = items.slice((page - 1) * 10, page * 10);

  return (
    <>
      <div className="ProductList">
        <h3>상품관리</h3>
        <div className='mg_box'>
          <div className='mg_mangeMenu'>
            <ul>
              <li onClick={() => { nav() }}>회원관리</li>
              <li onClick={() => { nav() }}>여행관리</li>
              <li onClick={() => { nav('/admin/productList') }}>상품관리</li>
              <li onClick={() => { nav('/admin/chart') }}>분석</li>
            </ul>
          </div>
        </div>
        <table className="ProductListTable">
          <thead>
            <tr>
              <th>no</th>
              <th>이미지</th>
              <th>상품명</th>
              <th>수량</th>
              <th>정가</th>
              <th>할인율</th>
              <th>판매가</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>작성한 게시글이 없습니다.</td>
              </tr>
            ) : (
              currentPageData.map((row) => (
                <tr key={row.pdNo}>
                  <td>{row.pdNo}</td>
                  <td><img src={`/images/shop/${row.filename}.jpg`} alt="image" width={50} /></td>
                  <td onClick={() => { nav(`/admin/productModify/${row.pdNo}`) }}>{row.pdName}</td>
                  <td>{row.pdMount}</td>
                  <td>{row.pdPrice}</td>
                  <td>{row.pdDiscount}</td>
                  <td>{row.pdPrice - (row.pdPrice * row.pdDiscount) / 100}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className='productListButton'>
          <button id='saveButton' onClick={() => { nav('/admin/productRegister') }}>상품등록</button>
        </div>
        <Page
          totalPage={totalPage}
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default ProductList;
