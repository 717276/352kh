import React, { useState } from "react";
import Pagination from "react-js-pagination";
import '../components/css/Page.css'

const Page = ({
  activePage = 1,
  itemsCountPerPage = 10,
  totalItemsCount = 450,
  pageRangeDisplayed = 5,
  onPageChange
}) => {
  const [page, setPage] = useState(activePage);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    if (onPageChange) {
      onPageChange(pageNumber); // 외부에서 전달된 페이지 변경 핸들러 호출
    }
  };

  return (
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={itemsCountPerPage} // 한 페이지당 아이템 갯수
      totalItemsCount={totalItemsCount} // 총 아이템 갯수
      pageRangeDisplayed={pageRangeDisplayed} // paginator의 페이지 범위
      prevPageText={"‹"} // "이전"을 나타낼 텍스트
      nextPageText={"›"} // "다음"을 나타낼 텍스트
      onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
    />
  );
};

export default Page;
