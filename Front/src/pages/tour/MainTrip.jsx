import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../components/css/tour/Trip.css";
import { jwtDecode } from "jwt-decode";

const Trip = () => {
  //  const { userNo } = useParams();
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {    
      try {
        const toursData = await fetchTours();    
        const filtered = filterTours(Math.floor(Math.random() * 5) + 1, toursData);
        setFilteredTours(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 여행 데이터 호출
  const fetchTours = async () => {
    const response = await fetch("http://localhost:8080/api/trip", {
      method: "GET",      
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Tours:", data);
    setTours(data);
    return data;
  };

  // 선호도에 따른 필터링
  const filterTours = (preferences, tours) => {
    if (tours.length === 0) return [];
    console.log("Filtering tours based on user preference...");
    const filtered = tours.filter((tour) => {
      return (
        (preferences === 1 && tour.pre.pf_rest === 1) ||
        (preferences === 2 && tour.pre.pf_sport === 1) ||
        (preferences === 3 && tour.pre.pf_walk === 1) ||
        (preferences === 4 && tour.pre.pf_cafe === 1) ||
        (preferences === 5 && tour.pre.pf_spot === 1)
      );
    });
    console.log("Filtered Tours:", filtered);
    return filtered;
  };

  const loadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  const handleItemClick = (t_no) => {
    navigate(`/tripDetail/${t_no}`);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const groupedData = [];
  for (let i = 0; i < filteredTours.length; i += 3) {
    groupedData.push(filteredTours.slice(i, i + 3));
  }

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
        {visibleItems < filteredTours.length && (
          <div className="loadMore">
            <button onClick={loadMore}>+ 더보기</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Trip;