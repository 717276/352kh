import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../components/css/tour/TripDetail.css";

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

  // const mockReviews = [
  //   {
  //     id: 1,
  //     img: "/images/tour/place1.png",
  //     title: "리뷰 제목 1",
  //     content:
  //       "이것은 첫 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },
  //   {
  //     id: 2,
  //     img: "/images/tour/place2.png",
  //     title: "리뷰 제목 2",
  //     content:
  //       "이것은 두 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },
  //   {
  //     id: 3,
  //     img: "/images/tour/place3.png",
  //     title: "리뷰 제목 3",
  //     content:
  //       "이것은 세 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },
  //   {
  //     id: 4,
  //     img: "/images/tour/place1.png",
  //     title: "리뷰 제목 4",
  //     content:
  //       "이것은 네 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },
  //   {
  //     id: 5,
  //     img: "/images/tour/place2.png",
  //     title: "리뷰 제목 5",
  //     content:
  //       "이것은 다섯 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },
  //   {
  //     id: 6,
  //     img: "/images/tour/place3.png",
  //     title: "리뷰 제목 6",
  //     content:
  //       "이것은 여섯 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },
  //   {
  //     id: 7,
  //     img: "/images/tour/place1.png",
  //     title: "리뷰 제목 7",
  //     content:
  //       "이것은 일곱 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },
  //   {
  //     id: 8,
  //     img: "/images/tour/place2.png",
  //     title: "리뷰 제목 8",
  //     content:
  //       "이것은 여덟 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },
  //   {
  //     id: 9,
  //     img: "/images/tour/place3.png",
  //     title: "리뷰 제목 9",
  //     content:
  //       "이것은 아홉 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },
  //   {
  //     id: 10,
  //     img: "/images/tour/place1.png",
  //     title: "리뷰 제목 10",
  //     content:
  //       "이것은 열 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },
  //   {
  //     id: 11,
  //     img: "/images/tour/place2.png",
  //     title: "리뷰 제목 11",
  //     content:
  //       "이것은 열한 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },
  //   {
  //     id: 12,
  //     img: "/images/tour/place3.png",
  //     title: "리뷰 제목 12",
  //     content:
  //       "이것은 열두 번째 리뷰의 내용입니다. 리뷰에 대한 간단한 소개를 제공합니다.",
  //   },

  //   // 추가적인 리뷰 데이터를 여기에 추가
  // ];

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
        <button>신청하기</button>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        <button>수정하기</button>
      </div>
    </div>
  );
};

export default TripDetail;
