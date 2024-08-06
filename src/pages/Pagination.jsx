import React, { useState, useEffect } from "react";
import '../components/css/Page.css';

const Page = ({ totalPage, page, setPage }) => {
  const limit = 10;
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);

  const sliceArrayByLimit = (totalPage, limit) => {
    const result = [];
    for (let i = 0; i < totalPage; i += limit) {
      result.push(Array.from({ length: limit }, (_, index) => i + index + 1).filter(val => val <= totalPage));
    }
    return result;
  };

  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    }
  }, [page]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage]);

  return (
    <div className="page-container">
      <button
        className="page-button"
        onClick={() => setPage(1)}
        disabled={page === 1}
      >
        First
      </button>
      <button
        className="page-button"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <div className="page-buttons-container">
        {currentPageArray?.map((i) => (
          <button
            key={i}
            className="page-button"
            onClick={() => setPage(i)}
            aria-current={page === i ? 'page' : null}
          >
            {i}
          </button>
        ))}
      </div>
      <button
        className="page-button"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPage}
      >
        Next
      </button>
      <button
        className="page-button"
        onClick={() => setPage(totalPage)}
        disabled={page === totalPage}
      >
        Last
      </button>
    </div>
  );
};

export default Page;
