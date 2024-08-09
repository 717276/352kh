import React, { useState, useEffect } from 'react';
import '../../components/css/admin/ProductList.css';
import { useNavigate } from 'react-router-dom';
import Page from '../Pagination';

const ProductList = () => {
  const nav = useNavigate();
  const [items, setItemsList] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortType, setSortType] = useState(""); // 카테고리 선택 상태

  const url = 'http://localhost:8080/api/admin/productList';

  useEffect(() => {
    getList(url);
  }, []);

  const getList = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItemsList(data);
        setSortedData(data); // 초기 데이터는 정렬된 데이터로 설정
        console.log(data);
      });
  };

  // sortType이 변경될 때 필터링
  useEffect(() => {
    if (sortType === "") {
      setSortedData(items);
    } else {
      setSortedData(items.filter(item => item.pd_category === parseInt(sortType)));
    }
  }, [sortType, items]);

  // 페이징
  const [page, setPage] = useState(1);
  const totalItems = sortedData.length;
  const totalPage = Math.ceil(totalItems / 10);
  const currentPageData = sortedData.slice((page - 1) * 10, page * 10);

  return (
    <>
      <div className="ProductList">
        <h3>상품관리</h3>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="">선택</option>
          <option value="0">위생용품</option>
          <option value="1">간식 및 사료</option>
          <option value="2">강아지옷</option>
          <option value="3">악세사리</option>
        </select>
        <div className='productListButton'>
          <button id='saveButton' onClick={() => { nav('/admin/productRegister') }}>상품등록</button>
        </div>
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
              <th hidden>정가</th>
              <th hidden>할인율</th>
              <th>판매가</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>작성한 게시글이 없습니다.</td>
              </tr>
            ) : (
              currentPageData.map((row) => (
                <tr key={row.pd_no}>
                  <td>{row.pd_no}</td>
                  <td>
                    {row.img ? (
                      <img src={`/images/shop/product_${row.img.i_ref_no}_1.jpg`} alt="image" width={50} />
                    ) : (
                      <img src={`/images/shop/product_default.jpg`} alt="default" width={50} />
                    )}
                  </td>
                  <td onClick={() => { nav(`/admin/productModify/${row.pd_no}`) }}>{row.pd_name}</td>
                  <td>{row.pd_mount}</td>
                  <td hidden>{row.pd_price}</td>
                  <td hidden>{row.pd_discount}</td>
                  <td>{row.pd_price - (row.pd_price * row.pd_discount) / 100}</td>
                  <td hidden>{row.pd_category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
