import React from "react";
import { useNavigate } from "react-router-dom";
import "../../components/css/tour/TripList.css";

const mockTripList = [
  {
    id: 1,
    name: "서울 시티 투어",
    description: "서울의 주요 명소를 둘러보는 시티 투어입니다.",
    startDate: "2024-08-01",
    endDate: "2024-08-05",
    image: "/images/tour/place1.png",
    tour: {
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
          ],
          foods: [
            {
              id: 1,
              name: "식당 1",
              address: "서울 강남구",
              image: "/images/tour/place1.png",
            },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    name: "부산 해운대 투어",
    description: "부산 해운대를 포함한 다양한 관광지를 둘러보는 투어입니다.",
    startDate: "2024-09-10",
    endDate: "2024-09-15",
    image: "/images/tour/place2.png",
    tour: {
      days: [
        {
          hotel: {
            name: "호텔 B",
            price: "120,000원",
            image: "/images/tour/place2.png",
          },
          places: [
            {
              id: 1,
              name: "명소 2",
              address: "부산 해운대구",
              image: "/images/tour/place2.png",
            },
          ],
          foods: [
            {
              id: 1,
              name: "식당 2",
              address: "부산 해운대구",
              image: "/images/tour/place2.png",
            },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    name: "제주도 자연 탐방",
    description: "제주도의 아름다운 자연을 탐방하는 투어입니다.",
    startDate: "2024-10-01",
    endDate: "2024-10-07",
    image: "/images/tour/place3.png",
    tour: {
      days: [
        {
          hotel: {
            name: "호텔 C",
            price: "150,000원",
            image: "/images/tour/place3.png",
          },
          places: [
            {
              id: 1,
              name: "명소 3",
              address: "제주 서귀포시",
              image: "/images/tour/place3.png",
            },
          ],
          foods: [
            {
              id: 1,
              name: "식당 3",
              address: "제주 서귀포시",
              image: "/images/tour/place3.png",
            },
          ],
        },
      ],
    },
  },
  // 추가 투어 데이터
];

const TripList = () => {
  const navigate = useNavigate();

  const handleTripClick = (id) => {
    navigate(`/admin/tripApproval/${id}`);
  };

  return (
    <div className="TripList">
      <h1>투어 리스트</h1>
      <div className="trip-items">
        {mockTripList.map((trip) => (
          <div
            key={trip.id}
            className="trip-item"
            onClick={() => handleTripClick(trip.id)}
          >
            <img src={trip.image} alt={trip.name} />
            <div className="trip-info">
              <h2>{trip.name}</h2>
              <p>{trip.description}</p>
              <p>
                {trip.startDate} ~ {trip.endDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripList;
