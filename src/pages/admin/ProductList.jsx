import React, { useState, useEffect } from 'react';
import '../../components/css/admin/ProductList.css';
import { useNavigate } from 'react-router-dom';
import Page from '../Page'; // Page 컴포넌트의 경로에 맞게 수정

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
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 해당하는 데이터 로딩
  useEffect(() => {
    // 데이터 페칭 로직 (여기서는 데이터 조각화 예시)
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = allData.slice(startIndex, endIndex);
    setTableData(paginatedData);
  }, [currentPage]);

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
            {tableData.map((row) => (
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
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ProductList;
