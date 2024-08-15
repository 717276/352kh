import { useEffect, useState, useMemo } from "react";
import { useNavigate} from "react-router-dom";
import "../../../components/css/tour/Trip.css";

const MainTrip = ({tourData}) => {    
  const [visibleItems, setVisibleItems] = useState(6);
  const navigate = useNavigate();  
  const loadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  const handleItemClick = (t_no) => {
    navigate(`/tour/tripDetail/${t_no}`);
  };

  useEffect(()=>{
  },[tourData])

  const truncateText = (text, maxLength) => {

    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const tours = useMemo(() => tourData, [tourData]);
  const groupedData = useMemo(() => {
    const result = [];
    if (tours.length > 0) {
      for (let i = 0; i < tours.length; i += 3) {
        result.push(tours.slice(i, i + 3));
      }
    }
    return result;
  }, [tours]);

  const getImageUrl = (img) => {
    if (img.i_no === -1) {
      const randomNum = Math.floor(Math.random() * (2 + 1));
      const newUrl = "tour_default_" + randomNum + ".jpg"; 
      return newUrl;
    } else{
      return `${img.i_category}_${img.i_ref_no}_${img.i_order}.jpg`;
    }    
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
        {visibleItems < tours.length && (
          <div className="loadMore">
            <button onClick={loadMore}>+ 더보기</button>
          </div>
        )}
      </div>
    </>
  );
};

export default MainTrip;