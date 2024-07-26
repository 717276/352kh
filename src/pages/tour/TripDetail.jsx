import "../../components/css/tour/TripDetail.css";
import place1 from "../../images/place/place1.png";
const TripDetail = () => {
  return (
    <>
      <div className="TripDetail">
        <h1>투어 상세정보</h1>
        <div className="placeInfo">
          <img src={place1} />
          <div className="placedesc">
            <span>경복궁</span>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
};
export default TripDetail;
