import {Routes, Route} from 'react-router-dom';
import MyPage from './MyPage';
import Order from './order/Order';
import Payment from './order/Payment';
import PaymentResult from './order/PaymentResult';
import TourOrder from './tourOrder/TourOrder';
import TourPayment from './tourOrder/Payment';
const User=()=>{
    return(
        <Routes>
            <Route path="mypage" element={<MyPage />} /> 
            <Route path="order" element={<Order/>}/>
            <Route path="payment" element={<Payment/>}/>
            <Route path="payment/result" element={<PaymentResult/>}/>
            <Route path="tour/order" element={<TourOrder/>}/>
            <Route path="tour/payemnt" element={<TourPayment/>}/>
        </Routes>
    );
}
export default User;