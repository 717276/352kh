import React, { useState } from "react";
import '../../components/css/review/ReviewList.css';
import { useNavigate } from "react-router-dom";

// 예시 데이터
const tableData = [
  { id: 1, title: 'review1', userId: 'hkd01', like: 28, readCount: 50, date: '2024-07-24' },
  { id: 2, title: 'review2', userId: 'hkd02', like: 28, readCount: 100, date: '2024-07-24' },
  { id: 3, title: 'review3', userId: 'hkd03', like: 28, readCount: 75, date: '2024-07-24' },
];

const ReviewList = () => {
  const nav = useNavigate();
  const [sortedData, setSortedData] = useState(tableData); 
  const [sortType, setSortType] = useState(""); 

  const handleSortChange = (e) => {
    const selectedSortType = e.target.value;

    if (selectedSortType === 'best') {
      // 조회 많은 순으로 정렬
      const sorted = [...tableData].sort((a, b) => b.readCount - a.readCount);
      setSortedData(sorted);
    } else if (selectedSortType === 'worst') {
      // 조회 적은 순으로 정렬
      const sorted = [...tableData].sort((a, b) => a.readCount - b.readCount);
      setSortedData(sorted);
    }

    setSortType(selectedSortType); 
  };

  return (
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
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td hidden>{row.id}</td>
              <td onClick={() => { nav(`/reviewComment/${row.id}`) }}>{row.title}</td>
              <td>{row.userId}</td>
              <td>{row.like}</td>
              <td>{row.readCount}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewList;
