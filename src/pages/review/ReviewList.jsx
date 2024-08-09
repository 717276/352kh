import React, { useEffect, useState } from 'react';
import '../../components/css/review/ReviewList.css';
import { useNavigate } from "react-router-dom";
import Page from '../Pagination';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const ReviewList = () => {
  const nav = useNavigate();

  const [items, setReviewList] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortType, setSortType] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  const url = 'http://localhost:8080/api/review';

  useEffect(() => {
    getList(url);
  }, []);

  const getList = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReviewList(data);
        setSortedData(data);
      })
  };

  const handleSortChange = (e) => {
    const selectedSortType = e.target.value;

    let sorted;
    if (selectedSortType === 'best') {
      sorted = [...sortedData].sort((a, b) => b.ar_view - a.ar_view);
    } else if (selectedSortType === 'worst') {
      sorted = [...sortedData].sort((a, b) => a.ar_view - b.ar_view);
    } else {
      sorted = [...items];
    }

    setSortedData(sorted);
    setSortType(selectedSortType);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filteredData = items.filter(item =>
      item.arTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ttitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.arUserId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedData(filteredData);
    setPage(1); // 검색 후 첫 페이지로 이동
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
              <th>투어</th>
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
                <tr key={row.ar_no}>
                  <td hidden>{row.ar_no}</td>
                  <td>{row.t_title}</td>
                  <td onClick={() => { nav(`/reviewComment/${row.ar_no}`) }}>{row.ar_title}</td>
                  <td>{row.ar_userId}</td>
                  <td>{row.ar_like}</td>
                  <td>{row.ar_view}</td>
                  <td>{formatDate(row.ar_createdDate)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="ReviewButton">
          <div className="ReviewSearch">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button id='searchBtn' onClick={handleSearch}>검색</button>
            <button className="primary" onClick={() => nav('/reviewWrite')}>후기작성</button>
          </div>
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

export default ReviewList;
