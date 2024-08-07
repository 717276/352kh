import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/css/tour/TripList.css";

const TripList = () => {
  const [tours, setTours] = useState([]);
  const [visibleItems, setVisibleItems] = useState(5); // 처음에 5개 항목을 표시
  const [filter, setFilter] = useState("all"); // 필터 상태 추가
  const navigate = useNavigate();
  const url = "http://localhost:8080/api/trip";

  const getTourList = (url) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // 최신순으로 정렬
        const sortedData = data.sort((a, b) => b.t_no - a.t_no);
        setTours(sortedData);
        console.log(sortedData);
      })
      .catch((err) => {
        console.error("Error fetching tours:", err);
      });
  };

  useEffect(() => {
    getTourList(url);
  }, []);

  const handleTripClick = (t_no) => {
    navigate(`/admin/tripApproval/${t_no}`);
  };

  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  // 글이 길 때 ...으로 생략
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const loadMore = () => {
    setVisibleItems((prev) => prev + 5); // "더보기" 클릭 시 5개 항목 추가로 표시
  };

  // 필터에 따라 투어 리스트를 필터링
  const filteredTours = tours.filter((trip) => {
    if (filter === "waiting") {
      return trip.t_status === 0;
    }
    if (filter === "approved") {
      return trip.t_status === 1;
    }
    return true; // 'all' 필터일 경우 전체 투어를 반환
  });

  // 이미지 url
  const getImageUrl = (img) => {
    return `/images/${img.i_category}/${img.i_ref_no}/${img.i_order}.png`;
  };

  return (
    <div className="TripList">
      <h1>투어 리스트</h1>
      <ul className="sort-type trip-ul">
        <li onClick={() => setFilter("all")}>전체</li>
        <li onClick={() => setFilter("waiting")}>승인대기</li>
        <li onClick={() => setFilter("approved")}>승인확인</li>
      </ul>
      <div className="trip-items">
        {filteredTours.slice(0, visibleItems).map((trip) => (
          <div
            key={trip.t_no}
            className="trip-item"
            onClick={() => handleTripClick(trip.t_no)}
          >
            <img src={getImageUrl(trip.img)} alt={trip.t_title} />
            <div className="trip-info">
              <h2>{trip.t_title}</h2>
              <p>{truncateText(trip.t_explain, 20)}</p>
              <p>
                {formatDateToYYYYMMDD(trip.t_strDate)} ~{" "}
                {formatDateToYYYYMMDD(trip.t_endDate)}
              </p>
            </div>
            <button
              className={trip.t_status === 0 ? "waitingBtn" : "approvalBtn"}
            >
              {trip.t_status === 0 ? "승인 대기중" : "승인 확인"}
            </button>
          </div>
        ))}
      </div>
      {visibleItems < filteredTours.length && (
        <div className="loadMore">
          <button onClick={loadMore}>+ 더보기</button>
        </div>
      )}
    </div>
  );
};

export default TripList;
