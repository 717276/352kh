import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../components/css/tour/TripDetail.css";
import { jwtDecode } from "jwt-decode";

const TripDetail = () => {
  const { t_no } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState({ places: 0, foods: 0 });
  const [visibleReviews, setVisibleReviews] = useState(10);
  const [selectedDay, setSelectedDay] = useState(1);
  const [tourDetail, setTourDetail] = useState(null);

  useEffect(() => {
    const url = `http://localhost:8080/api/tripDetail/${t_no}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTourDetail(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching tour detail:", error));
  }, [t_no]);

  if (!tourDetail) {
    return <div>Loading...</div>;
  }

  const {
    t_title,
    t_explain,
    t_totalPrice,
    t_strDate,
    t_endDate,
    hotels,
    places,
    restaurantes,
    articles,
  } = tourDetail;

  // 글이 길 때 ...으로 생략
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prevVisible) => prevVisible + 6);
  };

  const handleReviewClick = (id) => {
    navigate(`/reviewComment/${id}`);
  };

  const handleDaySelect = (index) => {
    setSelectedDay(index + 1);
    setCurrentIndex({ places: 0, foods: 0 });
  };

  const prevSpot = (type, length) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [type]: prevIndex[type] === 0 ? length - 4 : prevIndex[type] - 1,
    }));
  };

  const nextSpot = (type, length) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [type]: prevIndex[type] === length - 4 ? 0 : prevIndex[type] + 1,
    }));
  };

  const getImageUrl = (img) => {
    return `/images/tourdetail/${t_no}/${img.ti_category}/${img.ti_day}/${img.ti_order}.png`;
  };

  const getArtiImageUrl = (img) => {
    return `/images/${img.i_category}/${img.i_category}_${img.i_ref_no}_${img.i_order}.png`;
  };

  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const filteredHotels = hotels.filter((hotel) => hotel.h_day === selectedDay);
  const filteredPlaces = places.filter((place) => place.pl_day === selectedDay);
  const filteredRestaurantes = restaurantes.filter(
    (res) => res.res_day === selectedDay
  );

  const applyForTour = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No access token found");
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userNo = decodedToken.userNo; // JWT에서 userNo 추출

    try {
      const response = await fetch(`http://localhost:8080/api/applyForTour`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ t_no: t_no, userNo: userNo }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Application successful:", data);
      // 추가적인 처리 로직 (예: 성공 메시지 표시, 페이지 이동 등)
    } catch (error) {
      console.error("Error applying for tour:", error);
      // 오류 처리 로직 (예: 오류 메시지 표시)
    }
  };

  return (
    <div className="TripDetail">
      <h1>투어 설명</h1>
      <div className="day-selector">
        {[...Array(3)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleDaySelect(index)}
            className={selectedDay === index + 1 ? "active" : ""}
          >
            Day {index + 1}
          </button>
        ))}
      </div>
      <div className="section">
        <h2>호텔</h2>
        {filteredHotels.map((hotel, index) => (
          <div key={index} className="spot hotel">
            <img src={getImageUrl(hotel.img)} alt={hotel.h_name} />
            <div className="hotel-info">
              <p>{hotel.h_location}</p>
              <p>{hotel.h_name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="section">
        <h2>관광지</h2>
        <div className="spots-container">
          {filteredPlaces.length > 4 && (
            <span
              onClick={() => prevSpot("places", filteredPlaces.length)}
              className="arrow left-arrow"
            >
              &#10094;
            </span>
          )}
          <div
            className={`spots ${filteredPlaces.length > 4 ? "carousel" : ""}`}
          >
            {filteredPlaces
              .slice(currentIndex.places, currentIndex.places + 4)
              .map((spot, index) => (
                <div key={index} className="spot">
                  <img src={getImageUrl(spot.img)} alt={`Spot ${index}`} />
                  <p>{spot.pl_name}</p>
                  <p>{spot.pl_location}</p>
                </div>
              ))}
          </div>
          {filteredPlaces.length > 4 && (
            <span
              onClick={() => nextSpot("places", filteredPlaces.length)}
              className="arrow right-arrow"
            >
              &#10095;
            </span>
          )}
        </div>
      </div>
      <div className="section">
        <h2>식당</h2>
        <div className="spots-container">
          {filteredRestaurantes.length > 4 && (
            <span
              onClick={() => prevSpot("foods", filteredRestaurantes.length)}
              className="arrow left-arrow"
            >
              &#10094;
            </span>
          )}
          <div
            className={`spots ${
              filteredRestaurantes.length > 4 ? "carousel" : ""
            }`}
          >
            {filteredRestaurantes
              .slice(currentIndex.foods, currentIndex.foods + 4)
              .map((food, index) => (
                <div key={index} className="spot">
                  <img src={getImageUrl(food.img)} alt={`Food ${index}`} />
                  <p>{food.res_name}</p>
                  <p>{food.res_location}</p>
                </div>
              ))}
          </div>
          {filteredRestaurantes.length > 4 && (
            <span
              onClick={() => nextSpot("foods", filteredRestaurantes.length)}
              className="arrow right-arrow"
            >
              &#10095;
            </span>
          )}
        </div>
      </div>
      <div className="tour-details">
        <h2>투어 이름: {t_title}</h2>
        <p>투어 설명: {t_explain}</p>
        <p>투어 가격: {t_totalPrice}</p>
        <p>
          투어 시작 날짜 - 종료 날짜: {formatDateToYYYYMMDD(t_strDate)} ~{" "}
          {formatDateToYYYYMMDD(t_endDate)}
        </p>
      </div>
      {articles && articles.length > 0 && (
        <div className="reviews">
          {articles.slice(0, visibleReviews).map((review) => (
            <div
              key={review.ar_no}
              className="review"
              onClick={() => handleReviewClick(review.ar_no)}
            >
              <img
                src={getArtiImageUrl(review.img)}
                alt={`Review ${review.ar_no}`}
              />
              <div className="review-text">
                <h3>{review.ar_title}</h3>
                <p>{truncateText(review.ar_content, 30)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {articles && visibleReviews < articles.length && (
        <div className="load-more">
          <p onClick={loadMoreReviews} className="load-more-text">
            + 더보기
          </p>
        </div>
      )}
      <div className="detail-actions">
        <button className="detail-actions-register">신청하기</button>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        <button>수정하기</button>
      </div>
    </div>
  );
};

export default TripDetail;
