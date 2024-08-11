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
            <Route path="review/comment/:id" element={<ReviewComment/>}/>            
            <Route path="review/modify/:id" element={<ReviewModify/>}/>
        </Routes>
    );
}
export default Board;