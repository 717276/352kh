import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../components/css/tour/Trip.css";
import { jwtDecode } from "jwt-decode";

const Trip = () => {
  //  const { userNo } = useParams();
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6);
  const [userPre, setUserPre] = useState({});
  const navigate = useNavigate();

  const getUserInfo = async (userNo) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`http://localhost:8080/api/getPre/${userNo}`, {
      headers: {
        'authorization': accessToken,
      },
      credentials:'include',
      method: "GET",
    }).catch(error=>{
      console.log(error);
    });        
  };

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

  const filterTours = (preferences, tours) => {
    if (!preferences || tours.length === 0) return [];

    console.log("Filtering tours based on user preference...");
    const filtered = tours.filter((tour) => {
      return (
        (preferences.pf_rest === 1 && tour.pre.pf_rest === 1) ||
        (preferences.pf_sport === 1 && tour.pre.pf_sport === 1) ||
        (preferences.pf_walk === 1 && tour.pre.pf_walk === 1) ||
        (preferences.pf_cafe === 1 && tour.pre.pf_cafe === 1) ||
        (preferences.pf_spot === 1 && tour.pre.pf_spot === 1)
      );
    });
    console.log("Filtered Tours:", filtered);
    return filtered;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("No access token found");
        navigate("/login");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userNo = decodedToken.userNo; // JWT에서 userNo 추출

      try {
        const preferences = await getUserInfo(userNo);
        const toursData = await fetchTours();
        const filtered = filterTours(preferences, toursData);
        setFilteredTours(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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