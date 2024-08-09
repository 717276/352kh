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
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const checkIfApplied = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        navigate("/login");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userNo = decodedToken.userNo;

      const url = `http://localhost:8080/api/userTourList/${userNo}`;
      const response = await fetch(url);
      const tourNos = await response.json();

      const isTourApplied = tourNos.includes(parseInt(t_no, 10));
      setIsApplied(isTourApplied);
    };

    const fetchTourDetail = async () => {
      const url = `http://localhost:8080/api/tripDetail/${t_no}`;
      const response = await fetch(url);
      const data = await response.json();
      setTourDetail(data);
      console.log(data);
    };

    checkIfApplied();
    fetchTourDetail();
  }, [t_no, navigate]);

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

  const truncateText = (text, maxLength) => {
    if (!text) {
      return "";
    }
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
    if (!img || !img.ti_category) {
      return "/images/default.png"; // 기본 이미지 경로 또는 빈 문자열 반환
    }
    return `/images/tourimg/${img.ti_category}/${img.ti_category}_${img.ti_ref_no}_${img.ti_day}_${img.ti_order}.jpg`;
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
    (res) => res.pl_day === selectedDay
  );

  const applyForTour = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userNo = decodedToken.userNo;

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

      alert("투어 신청이 완료되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("Error applying for tour:", error);
      alert("투어 신청 중 오류가 발생했습니다.");
    }
  };

  const cancleTour = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userNo = decodedToken.userNo;

    try {
      const response = await fetch(`http://localhost:8080/api/cancleTour`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ t_no: t_no, userNo: userNo }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("투어 신청이 취소되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling tour:", error);
      alert("투어 취소 중 오류가 발생했습니다.");
    }
  };

  // 최대 day 값 계산
  const maxDay = Math.max(
    ...hotels.map((hotel) => hotel.h_day),
    ...places.map((place) => place.pl_day),
    ...restaurantes.map((res) => res.pl_day)
  );

  return (
    <div className="TripDetail">
      <h1>투어 설명</h1>
      <div className="day-selector">
        {[...Array(maxDay)].map((_, index) => (
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
              <p>{hotel.h_name}</p>
              <p>{hotel.h_price}원</p>
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
                  <p>{food.pl_name}</p>
                  <p>{food.pl_location}</p>
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
      {articles && articles.length > 0 && articles[0].ar_no !== 0 && (
        <div className="reviews">
          {articles.slice(0, visibleReviews).map((review) => (
            <div
              key={review.ar_no}
              className="review"
              onClick={() => handleReviewClick(review.ar_no)}
            >
              {
                // <img
                //   src={getArtiImageUrl(review.img)}
                //   alt={`Review ${review.ar_no}`}
                // />
              }
              <div className="review-text">
                <h3>{review.ar_title}</h3>
                <p>{truncateText(review.ar_content, 30)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {articles &&
        visibleReviews < articles.length &&
        articles[0].ar_no !== 0 && (
          <div className="load-more">
            <p onClick={loadMoreReviews} className="load-more-text">
              + 더보기
            </p>
          </div>
        )}
      <div className="detail-actions">
        {isApplied ? (
          <button className="detail-actions-applied" onClick={cancleTour}>
            신청취소
          </button>
        ) : (
          <button className="detail-actions-register" onClick={applyForTour}>
            신청하기
          </button>
        )}
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    </div>
  );
};

export default TripDetail;
