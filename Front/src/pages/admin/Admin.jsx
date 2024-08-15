import {Routes, Route} from 'react-router-dom'
import ProductList from './ProductList'; 
import ProductRegister from './ProductRegister';
import Management from './Management';
import TripApproval from './TripApproval';
import TripList from './TripList';
import Chart from './Chart';
import ProductModify from './ProductModify';
import ChatRoomList from '../csr/chat/ChatRoomList';
const Admin=()=>{
    return(
        <Routes>
            <Route path="productList" element={<ProductList />} />    
            <Route path="productRegister" element={<ProductRegister />} /> 
            <Route path="productModify/:pd_no" element={<ProductModify />} />
            <Route path="chart" element={<Chart />} />
            <Route path="/" element={<Management/>}/>   
            <Route path="tripApproval/:t_no" element={<TripApproval/>}></Route>         
            <Route path="tripList" element={<TripList />}></Route>              
            <Route path="admin/chat/" element={<ChatRoomList />}/>
        </Routes>
    );
}
export default Admin