import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/css/tour/TripDetail.css";

const TripApproval = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState({ places: 0, foods: 0 });
  const [visibleReviews, setVisibleReviews] = useState(10); // 초기에는 10개의 리뷰를 표시
  const [selectedDay, setSelectedDay] = useState(0);

  const mockTourData = [
    {
      days: [
        {
          hotel: {
            name: "호텔 A",
            price: "100,000원",
            image: "/images/tour/place1.png",
          },
          places: [
            {
              id: 1,
              name: "명소 1",
              address: "서울 강남구",
              image: "/images/tour/place1.png",
            },
            {
              id: 2,
              name: "명소 2",
              address: "서울 중구",
              image: "/images/tour/place2.png",
            },
            {
              id: 3,
              name: "명소 3",
              address: "서울 종로구",
              image: "/images/tour/place3.png",
            },
            {
              id: 4,
              name: "명소 4",
              address: "서울 서대문구",
              image: "/images/tour/place1.png",
            },
            {
              id: 5,
              name: "명소 5",
              address: "서울 마포구",
              image: "/images/tour/place2.png",
            },
          ],
          foods: [
            {
              id: 1,
              name: "식당 1",
              address: "서울 강남구",
              image: "/images/tour/place1.png",
            },
            {
              id: 2,
              name: "식당 2",
              address: "서울 중구",
              image: "/images/tour/place2.png",
            },
            {
              id: 3,
              name: "식당 3",
              address: "서울 종로구",
              image: "/images/tour/place3.png",
            },
            {
              id: 4,
              name: "식당 4",
              address: "서울 서대문구",
              image: "/images/tour/place1.png",
            },
            {
              id: 5,
              name: "식당 5",
              address: "서울 서대문구",
              image: "/images/tour/place2.png",
            },
          ],
        },
        {
          hotel: {
            name: "호텔 B",
            price: "120,000원",
            image: "/images/tour/place2.png",
          },
          places: [
            {
              id: 1,
              name: "명소 1",
              address: "서울 강북구",
              image: "/images/tour/place1.png",
            },
            {
              id: 2,
              name: "명소 2",
              address: "서울 성동구",
              image: "/images/tour/place2.png",
            },
          ],
          foods: [
            {
              id: 1,
              name: "식당 1",
              address: "서울 강북구",
              image: "/images/tour/place1.png",
            },
            {
              id: 2,
              name: "식당 2",
              address: "서울 성동구",
              image: "/images/tour/place2.png",
            },
            {
              id: 3,
              name: "식당 3",
              address: "서울 동대문구",
              image: "/images/tour/place3.png",
            },
            {
              id: 4,
              name: "식당 4",
              address: "서울 서대문구",
              image: "/images/tour/place1.png",
            },
            {
              id: 5,
              name: "식당 5",
              address: "서울 중랑구",
              image: "/images/tour/place2.png",
            },
            {
              id: 6,
              name: "식당 6",
              address: "서울 마포구",
              image: "/images/tour/place3.png",
            },
          ],
        },
        {
          hotel: {
            name: "호텔 C",
            price: "150,000원",
            image: "/images/tour/place3.png",
          },
          places: [
            {
              id: 1,
              name: "명소 1",
              address: "서울 용산구",
              image: "/images/tour/place1.png",
            },
            {
              id: 2,
              name: "명소 2",
              address: "서울 금천구",
              image: "/images/tour/place2.png",
            },
            {
              id: 3,
              name: "명소 3",
              address: "서울 동작구",
              image: "/images/tour/place3.png",
            },
          ],
          foods: [
            {
              id: 1,
              name: "식당 1",
              address: "서울 용산구",
              image: "/images/tour/place1.png",
            },
            {
              id: 2,
              name: "식당 2",
              address: "서울 금천구",
              image: "/images/tour/place2.png",
            },
            {
              id: 3,
              name: "식당 3",
              address: "서울 동작구",
              image: "/images/tour/place3.png",
            },
          ],
        },
      ],
    },
  ];
  const mockTourDetail = {
    name: "서울 시티 투어",
    description: "서울의 주요 명소를 둘러보는 시티 투어입니다.",
    price: "50,000원",
    startDate: "2024-08-01",
    endDate: "2024-08-05",
  };
  const loadMoreReviews = () => {
    setVisibleReviews((prevVisible) => prevVisible + 6);
  };

  const handleReviewClick = (id) => {
    navigate(`/reviewComment/${id}`);
  };

  const handleDaySelect = (index) => {
    setSelectedDay(index);
    setCurrentIndex({ places: 0, foods: 0 });
  };

  const prevSpot = (type) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [type]:
        prevIndex[type] === 0
          ? mockTourData[0].days[selectedDay][type].length - 4
          : prevIndex[type] - 1,
    }));
  };

  const nextSpot = (type) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [type]:
        prevIndex[type] === mockTourData[0].days[selectedDay][type].length - 4
          ? 0
          : prevIndex[type] + 1,
    }));
  };

  const { hotel, places, foods } = mockTourData[0].days[selectedDay];

  console.log("places length:", places.length);
  console.log("currentIndex places:", currentIndex.places);

  return (
    <div className="TripDetail">
      <h1>투어 설명</h1>
      <div className="day-selector">
        {mockTourData[0].days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDaySelect(index)}
            className={selectedDay === index ? "active" : ""}
          >
            Day {index + 1}
          </button>
        ))}
      </div>

      <div className="section">
        <h2>호텔</h2>
        <div className="spot hotel">
          <img src={hotel.image} alt="Hotel" />
          <div className="hotel-info">
            <p>{hotel.name}</p>
            <p>{hotel.price}</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>관광지</h2>
        <div className="spots-container">
          {places.length > 4 && (
            <span
              onClick={() => prevSpot("places")}
              className="arrow left-arrow"
            >
              &#10094;
            </span>
          )}
          <div className={`spots ${places.length > 4 ? "carousel" : ""}`}>
            {places
              .slice(currentIndex.places, currentIndex.places + 4)
              .map((spot, index) => (
                <div key={index} className="spot">
                  <img src={spot.image} alt={`Spot ${index}`} />
                  <p>{spot.name}</p>
                  <p>{spot.address}</p>
                </div>
              ))}
          </div>
          {places.length > 4 && (
            <span
              onClick={() => nextSpot("places")}
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
          {foods.length > 4 && (
            <span
              onClick={() => prevSpot("foods")}
              className="arrow left-arrow"
            >
              &#10094;
            </span>
          )}
          <div className={`spots ${foods.length > 4 ? "carousel" : ""}`}>
            {foods
              .slice(currentIndex.foods, currentIndex.foods + 4)
              .map((food, index) => (
                <div key={index} className="spot">
                  <img src={food.image} alt={`Food ${index}`} />
                  <p>{food.name}</p>
                  <p>{food.address}</p>
                </div>
              ))}
          </div>
          {foods.length > 4 && (
            <span
              onClick={() => nextSpot("foods")}
              className="arrow right-arrow"
            >
              &#10095;
            </span>
          )}
        </div>
      </div>

      <div className="tour-details">
        <h2>투어 이름: {mockTourDetail.name}</h2>
        <p>투어 설명: {mockTourDetail.description}</p>
        <p>투어 가격: {mockTourDetail.price}</p>
        <p>
          투어 시작 날짜 - 종료 날짜: {mockTourDetail.startDate} ~{" "}
          {mockTourDetail.endDate}
        </p>
      </div>
      <div className="detail-actions">
        <button>승인하기</button>
        <button>삭제하기</button>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    </div>
  );
};

export default TripApproval;
