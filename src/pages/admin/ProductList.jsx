import React, { useState, useEffect } from 'react';
import '../../components/css/admin/ProductList.css';
import { useNavigate } from 'react-router-dom';
import Page from '../Page';

// 예시 데이터 (보통 이 데이터는 API 호출을 통해 얻습니다.)
const allData = [
  { no: 1, name: 'product1', mount: 28, price: 5000, discount: 10 },
  { no: 2, name: 'product2', mount: 50, price: 10000, discount: 10 },
  { no: 3, name: 'product3', mount: 28, price: 15000, discount: 10 },
  { no: 4, name: 'product4', mount: 32, price: 20000, discount: 15 },
  { no: 5, name: 'product5', mount: 40, price: 25000, discount: 20 },
  { no: 6, name: 'product1', mount: 28, price: 5000, discount: 10 },
  { no: 7, name: 'product2', mount: 50, price: 10000, discount: 10 },
  { no: 8, name: 'product3', mount: 28, price: 15000, discount: 10 },
  { no: 9, name: 'product4', mount: 32, price: 20000, discount: 15 },
  { no: 10, name: 'product5', mount: 40, price: 25000, discount: 20 },
  { no: 11, name: 'product1', mount: 28, price: 5000, discount: 10 },
  { no: 12, name: 'product2', mount: 50, price: 10000, discount: 10 },
  { no: 13, name: 'product3', mount: 28, price: 15000, discount: 10 },
  { no: 14, name: 'product4', mount: 32, price: 20000, discount: 15 },
  { no: 15, name: 'product5', mount: 40, price: 25000, discount: 20 },
  // 필요한 만큼 추가
];

const ProductList = () => {
  const nav = useNavigate();
  const itemsPerPage = 10; // 한 페이지당 아이템 수
  const totalItemsCount = allData.length; // 총 아이템 수

  // 페이징
  const [page, setPage] = useState(1);
  const totalItems = allData.length;
  const totalPage = Math.ceil(totalItems / 10);
  const currentPageData = allData.slice((page - 1) * 10, page * 10);

  return (
    <>
      <div className="ProductList">
        <h3>상품관리</h3>
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
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((row) => (
              <tr key={row.no}>
                <td>{row.no}</td>
                <td>{/* 이미지 출력 로직 추가 */}</td>
                <td>{row.name}</td>
                <td>{row.mount}</td>
                <td>{row.price}</td>
                <td>{row.discount}</td>
                <td>{row.price - (row.price * row.discount) / 100}</td>
                <td>
                  <button id='modifyButton' onClick={() => { nav(`/admin/productRegister/${row.no}`) }}>수정</button>
                </td>
                <td>
                  <button id='deleteButton'>삭제</button>
                </td>
              </tr>
            ))}
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
