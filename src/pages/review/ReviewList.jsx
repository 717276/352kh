import React from "react";
import '../../components/css/review/ReviewList.css';
import { useNavigate } from "react-router-dom";

// 예시 데이터
const tableData = [
  { id: 1, title: 'review1', userId: 'hkd01', like: 28, readCount: 50, date: '2024-07-24' },
  { id: 2, title: 'review2', userId: 'hkd02', like: 28, readCount: 50, date: '2024-07-24' },
  { id: 3, title: 'review3', userId: 'hkd03', like: 28, readCount: 50, date: '2024-07-24' },
];

const ReviewList = ()=> {
  const nav = useNavigate();
  return (
    <div className="ReviewList">
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
              <td onClick={()=>{nav(`/ReviewComment/${row.id}`)}}>{row.title}</td>
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