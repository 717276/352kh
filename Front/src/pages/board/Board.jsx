import {Routes, Route} from 'react-router-dom'
import Review from './Review';
import ReviewWrite from './ReviewWrite'
import ReviewComment from './ReviewComment';
import ReviewModify from './ReviewModify';

const Board=()=>{
    return (
        <Routes>            
            <Route path="review" element={<Review />} />
            <Route path="review/write" element={<ReviewWrite/>}/> 
            <Route path="review/comment/:ar_no" element={<ReviewComment/>}/>            
            <Route path="review/modify/:ar_no" element={<ReviewModify/>}/>
        </Routes>
    );
}
export default Board;