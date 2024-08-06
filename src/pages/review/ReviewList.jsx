import React, { useEffect, useState } from 'react';
import '../../components/css/review/ReviewList.css';
import { useNavigate } from "react-router-dom";
import Page from '../Pagination';

const ReviewList = () => {
  const nav = useNavigate();

  const [items, setReviewList] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortType, setSortType] = useState("");

  const url = 'http://localhost:8080/api/review';

  useEffect(() => {
    getList(url);
  }, []);

  const getList = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReviewList(data);
        //setSortType(data);
        setSortedData(data);
      })
  };

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
      sorted = [...items];
    }

    setSortedData(sorted);
    setSortType(selectedSortType);
  };

  // 페이징
  const [page, setPage] = useState(1);
  const totalItems = sortedData.length;
  const totalPage = Math.ceil(totalItems / 10);
  const currentPageData = sortedData.slice((page - 1) * 10, page * 10);

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
            {currentPageData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>작성한 게시글이 없습니다.</td>
              </tr>
            ) : (
              currentPageData.map((row) => (
                <tr key={row.arNo}>
                  <td hidden>{row.arNo}</td>
                  <td onClick={() => { nav(`/reviewComment/${row.arNo}`) }}>{row.arTitle}</td>
                  <td>{row.arUserId}</td>
                  <td>{row.arLike}</td>
                  <td>{row.arView}</td>
                  <td>{row.arCreatedDate}</td>
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

export default ReviewList;
