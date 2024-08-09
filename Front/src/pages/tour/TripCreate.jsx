import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../components/css/tour/TripCreate.css";

const TripCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState({ places: 0, foods: 0 });
  const [selectedDay, setSelectedDay] = useState(1);
  const { tours, startDate } = location.state || {};
  const [endDate, setEndDate] = useState(null);
  const tourNameRef = useRef(null);
  const tourDescriptionRef = useRef(null);
  const tourPriceRef = useRef(null);
  const tourImageRef = useRef(null);

  const [tourDetail, setTourDetail] = useState({
    hotels: [],
    places: [],
    restaurantes: [],
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(value)) {
        return prevCategories.filter((category) => category !== value);
      } else if (prevCategories.length < 2) {
        return [...prevCategories, value];
      } else {
        return prevCategories;
      }
    });
  };

  useEffect(() => {
    if (tours && startDate) {
      const mappedPlaces = tours
        .map((tour, index) =>
          tour.places.map((place) => ({ ...place, day: index + 1 }))
        )
        .flat();

      const mappedRestaurantes = tours
        .map((tour, index) =>
          tour.res.map((res) => ({ ...res, day: index + 1 }))
        )
        .flat();

      setTourDetail({
        hotels: tours.map((tour) => tour.hotel),
        places: mappedPlaces,
        restaurantes: mappedRestaurantes,
      });

      // startDate를 Date 객체로 변환합니다.
      const startDateObj = new Date(startDate);

      // tours 배열의 길이만큼 startDate에 일수를 더해 endDate를 계산합니다.
      const calculatedEndDate = new Date(
        startDateObj.setDate(startDateObj.getDate() + tours.length - 1)
      );

      // 계산된 endDate를 "YYYY-MM-DD" 형식의 문자열로 변환하여 상태로 설정합니다.
      setEndDate(calculatedEndDate.toISOString().split("T")[0]);
    }
  }, [tours, startDate]);

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
    return img; // Assuming img is already a URL
  };

  const filteredHotels = tourDetail.hotels.filter(
    (hotel, index) => index === selectedDay - 1
  );
  const filteredPlaces = tourDetail.places.filter(
    (place) => place.day === selectedDay
  );
  const filteredRestaurantes = tourDetail.restaurantes.filter(
    (res) => res.day === selectedDay
  );

  const handleRegister = () => {
    const tourName = tourNameRef.current.value;
    const tourDescription = tourDescriptionRef.current.value;
    const tourPrice = tourPriceRef.current.value;
    const tourImageFile = tourImageRef.current.files[0];

    const formData = new FormData();
    formData.append("tourName", tourName);
    formData.append("tourDescription", tourDescription);
    formData.append("tourPrice", tourPrice);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("tourImageFile", tourImageFile);
    formData.append("categories", selectedCategories);
    formData.append("tours", JSON.stringify(tours));

    console.log(tours);

    fetch("http://localhost:8080/api/tourCreate", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.text(); // 서버에서 JSON이 아닌 텍스트를 반환하는 경우
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("투어 등록 성공:", data);
        alert("투어 등록이 완료되었습니다.");
        navigate("/mypage"); // 등록 성공 후 MyPage로 이동
      })
      .catch((error) => {
        console.error("투어 등록 실패:", error);
        alert("투어 등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="tc-TripDetail">
      <h1>투어 설명</h1>
      <div className="tc-day-selector">
        {tours.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDaySelect(index)}
            className={selectedDay === index + 1 ? "tc-active" : ""}
          >
            Day {index + 1}
          </button>
        ))}
      </div>
      <div className="tc-section">
        <h2>호텔</h2>
        {filteredHotels.map((hotel, index) => (
          <div key={index} className="tc-spot tc-hotel">
            <img src={getImageUrl(hotel.photo)} alt={hotel.name} />
            <div className="tc-hotel-info">
              <p>{hotel.name}</p>
              <p>{hotel.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="tc-section">
        <h2>관광지</h2>
        <div className="tc-spots-container">
          {filteredPlaces.length > 4 && (
            <span
              onClick={() => prevSpot("places", filteredPlaces.length)}
              className="tc-arrow tc-left-arrow"
            >
              &#10094;
            </span>
          )}
          <div
            className={`tc-spots ${
              filteredPlaces.length > 4 ? "tc-carousel" : ""
            }`}
          >
            {filteredPlaces
              .slice(currentIndex.places, currentIndex.places + 4)
              .map((spot, index) => (
                <div key={index} className="tc-spot">
                  <img src={getImageUrl(spot.photo)} alt={`Spot ${index}`} />
                  <p>{spot.name}</p>
                  <p>{spot.address}</p>
                </div>
              ))}
          </div>
          {filteredPlaces.length > 4 && (
            <span
              onClick={() => nextSpot("places", filteredPlaces.length)}
              className="tc-arrow tc-right-arrow"
            >
              &#10095;
            </span>
          )}
        </div>
      </div>
      <div className="tc-section">
        <h2>식당</h2>
        <div className="tc-spots-container">
          {filteredRestaurantes.length > 4 && (
            <span
              onClick={() => prevSpot("foods", filteredRestaurantes.length)}
              className="tc-arrow tc-left-arrow"
            >
              &#10094;
            </span>
          )}
          <div
            className={`tc-spots ${
              filteredRestaurantes.length > 4 ? "tc-carousel" : ""
            }`}
          >
            {filteredRestaurantes
              .slice(currentIndex.foods, currentIndex.foods + 4)
              .map((food, index) => (
                <div key={index} className="tc-spot">
                  <img src={getImageUrl(food.photo)} alt={`Food ${index}`} />
                  <p>{food.name}</p>
                  <p>{food.address}</p>
                </div>
              ))}
          </div>
          {filteredRestaurantes.length > 4 && (
            <span
              onClick={() => nextSpot("foods", filteredRestaurantes.length)}
              className="tc-arrow tc-right-arrow"
            >
              &#10095;
            </span>
          )}
        </div>
      </div>
      <div className="tc-tour-details">
        <div className="tc-tour-details-fdiv">
          <div>
            <div>
              <label>투어 이름:</label>
              <input type="text" ref={tourNameRef} />
            </div>
            <div>
              <label>투어 설명:</label>
              <input type="text" ref={tourDescriptionRef} />
            </div>
            <div>
              <label>투어 가격:</label>
              <input type="text" ref={tourPriceRef} />
            </div>
            <p>
              투어 시작 날짜 - 종료 날짜: {startDate} ~ {endDate}
            </p>
          </div>
          <div>
            <label>투어 대표 이미지:</label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="tc-preview-image"
              />
            )}
            <br></br>
            <input
              type="file"
              ref={tourImageRef}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="tc-category-selection">
          <label>카테고리 선택 (최소 1개, 최대 2개):</label>
          <div className="tc-category-container">
            <div>
              <input
                type="checkbox"
                value="pf_rest"
                onChange={handleCategoryChange}
                checked={selectedCategories.includes("pf_rest")}
              />
              <label className="tc-category-label">힐링</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="pf_sport"
                onChange={handleCategoryChange}
                checked={selectedCategories.includes("pf_sport")}
              />
              <label className="tc-category-label">스포츠</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="pf_cafe"
                onChange={handleCategoryChange}
                checked={selectedCategories.includes("pf_cafe")}
              />
              <label className="tc-category-label">여유</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="pf_walk"
                onChange={handleCategoryChange}
                checked={selectedCategories.includes("pf_walk")}
              />
              <label className="tc-category-label">산책</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="pf_spot"
                onChange={handleCategoryChange}
                checked={selectedCategories.includes("pf_spot")}
              />
              <label className="tc-category-label">명소</label>
            </div>
          </div>
        </div>
      </div>
      <div className="tc-detail-actions">
        <button className="tc-detail-actions-register" onClick={handleRegister}>
          등록하기
        </button>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    </div>
  );
};

export default TripCreate;
