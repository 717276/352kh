import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/css/tour/Trip.css";

const Trip = () => {
  const [tours, setTours] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/trip")
      .then((response) => response.json())
      .then((data) => {
        setTours(data);
      })
      .catch((error) => {
        console.error("Error fetching tours:", error);
      });
  }, []);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  const handleItemClick = (t_no) => {
    navigate(`/tripDetail/${t_no}`);
  };

  // 글이 길 때 ...으로 생략
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  // mockData를 3개씩 묶어서 그룹화
  const groupedData = [];
  for (let i = 0; i < tours.length; i += 3) {
    groupedData.push(tours.slice(i, i + 3));
  }

  //이미지 url
  const getImageUrl = (img) => {
    return `/images/${img.i_category}/${img.i_ref_no}/${img.i_order}.png`;
  };

  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div>
        <div className="title">
          <h1>투어 추천 리스트</h1>
        </div>
        {groupedData.slice(0, visibleItems / 3).map((group, groupIndex) => (
          <div className="TourList" key={groupIndex}>
            {group.map((item) => (
              <div
                className="listItem"
                key={item.t_no}
                onClick={() => handleItemClick(item.t_no)}
              >
                <img src={getImageUrl(item.img)} alt={item.name} />
                <div className="placeDescription">
                  <div className="placeName">{item.t_title}</div>
                  <div className="placeLocation">
                    {truncateText(item.t_explain, 20)}
                  </div>
                  <div className="placeLocation">
                    {formatDateToYYYYMMDD(item.t_strDate)} ~{" "}
                    {formatDateToYYYYMMDD(item.t_endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        {visibleItems < tours.length && (
          <div className="loadMore">
            <button onClick={loadMore}>+ 더보기</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Trip;
