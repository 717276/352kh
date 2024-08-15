import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../components/css/tour/Trip.css";
import { jwtDecode } from "jwt-decode";

const Trip = () => {  
  const [tours, setTours] = useState([]);  
  const [visibleItems, setVisibleItems] = useState(6);  
  const navigate = useNavigate();

  const similarity = async(userNo)=>{
    const response =  await fetch('http://localhost:8080/api/trip/similarity',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        userNo : userNo, 
      })
    });
    if (response.status === 200){
      const data = await response.json();
      console.log(data);
      return data;
    }else{
      alert("추천 투어 목록 가져오기 오류");
    }
    return;
  }
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");      
      const decodedToken = jwtDecode(token);
      const userNo = decodedToken.userNo; // JWT에서 userNo 추출

      try {        
        const toursData = await similarity(userNo);
        console.log(toursData);
        setTours(toursData);        
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
    navigate(`/tour/tripDetail/${t_no}`);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const groupedData = [];
  if (tours){
    for (let i = 0; i < tours.length; i += 3) {
      groupedData.push(tours.slice(i, i + 3));
    }
  }

  const getImageUrl = (img) => {
    if(img.i_no === -1) {
      const randomNum = Math.floor(Math.random() * (2 + 1));
      const imgUrl = "tour_default_" + randomNum + ".jpg";      
      return imgUrl;
    }    
    return `${img.i_category}_${img.i_ref_no}_${img.i_order}.jpg`;
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
        {tours && groupedData.slice(0, visibleItems / 3).map((group, groupIndex) => (
          <div className="TourList" key={groupIndex}>
            {group.map((item) => (
              <div
                className="listItem"
                key={item.t_no}
                onClick={() => handleItemClick(item.t_no)}
              >
                {item.matchCount >= 2 && (
                  <div className="recommendation-badge">추천</div>
                )}
                <img src={`/images/tour/${getImageUrl(item.img)}`} alt={item.name} />
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
        {tours && visibleItems < tours.length && (
          <div className="loadMore">
            <button onClick={loadMore}>+ 더보기</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Trip;