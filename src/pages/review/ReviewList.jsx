import React, { useEffect, useState } from 'react';
import '../../components/css/review/ReviewList.css';
import { useNavigate } from "react-router-dom";
import Page from '../Page';

// 예시 데이터
const allData = [
  { id: 1, title: 'review1', userId: 'hkd01', like: 28, readCount: 50, date: '2024-07-24' },
  { id: 2, title: 'review2', userId: 'hkd02', like: 28, readCount: 50, date: '2024-07-24' },
  { id: 3, title: 'review3', userId: 'hkd03', like: 28, readCount: 50, date: '2024-07-24' },
  { id: 4, title: 'review4', userId: 'hkd04', like: 30, readCount: 60, date: '2024-07-25' },
  { id: 5, title: 'review5', userId: 'hkd05', like: 32, readCount: 70, date: '2024-07-26' },
  { id: 6, title: 'review3', userId: 'hkd03', like: 28, readCount: 50, date: '2024-07-24' },
  { id: 7, title: 'review4', userId: 'hkd04', like: 30, readCount: 60, date: '2024-07-25' },
  { id: 8, title: 'review5', userId: 'hkd05', like: 32, readCount: 70, date: '2024-07-26' },
  { id: 9, title: 'review10', userId: 'hkd10', like: 35, readCount: 90, date: '2024-08-01' },
  { id: 10, title: 'review10', userId: 'hkd10', like: 35, readCount: 90, date: '2024-08-01' },
  { id: 11, title: 'review3', userId: 'hkd03', like: 28, readCount: 50, date: '2024-07-24' },
  { id: 12, title: 'review4', userId: 'hkd04', like: 30, readCount: 60, date: '2024-07-25' },
  { id: 13, title: 'review5', userId: 'hkd05', like: 32, readCount: 70, date: '2024-07-26' },
  { id: 14, title: 'review10', userId: 'hkd10', like: 35, readCount: 90, date: '2024-08-01' },
];

const ReviewList = () => {
  const nav = useNavigate();

  const [sortedData, setSortedData] = useState(allData);
  const [sortType, setSortType] = useState("");

  const handleSortChange = (e) => {
    const selectedSortType = e.target.value;

    let sorted;
    if (selectedSortType === 'best') {
      // 조회 많은 순으로 정렬
      sorted = [...sortedData].sort((a, b) => b.readCount - a.readCount);
    } else if (selectedSortType === 'worst') {
      // 조회 적은 순으로 정렬
      sorted = [...sortedData].sort((a, b) => a.readCount - b.readCount);
    } else {
      // 정렬이 없는 경우 원래 데이터로 리셋
      sorted = [...allData];
    }

    setSortedData(sorted);
    setSortType(selectedSortType);
  };

  const itemsPerPage = 10; // 한 페이지당 아이템 수
  const totalItemsCount = sortedData.length; // 총 아이템 수
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 해당하는 데이터 로딩
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, endIndex);
    setTableData(paginatedData);
  }, [currentPage, sortedData]); // sortedData도 의존성에 추가

  return (
    <>
      <div className="ReviewList">
        <select value={sortType} onChange={handleSortChange}>
          <option value="">선택</option>
          <option value="best">조회 많은 순</option>
          <option value="worst">조회 적은 순</option>
        </select>
        <table className="ReviewListTable">
          <thead>
            <tr>
              <th hidden>no</th>
              <th>제목</th>
              <th>작성자</th>
              <th>좋아요</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td hidden>{row.id}</td>
                <td onClick={() => { nav(`/ReviewComment/${row.id}`) }}>{row.title}</td>
                <td>{row.userId}</td>
                <td>{row.like}</td>
                <td>{row.readCount}</td>
                <td>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

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

export default ReviewList;
