import ReviewList from "./ReviewList";
import { useNavigate } from "react-router-dom";
import '../../components/css/review/Review.css';

const Review = () => {
  const nav = useNavigate();


  return (
    <>
      <div className="Review1">
        <div className="Review">
          <h3>후기게시판</h3>
          <ReviewList />
        </div>
      </div>

    </>
  );
};

export default Review;