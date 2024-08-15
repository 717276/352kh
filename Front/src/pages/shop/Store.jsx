import {Routes,Route} from 'react-router-dom'
import Shop from './Shop';
import ShopList from './ShopList';
import Product from './Product';
const Store=()=>{
    return(
        <Routes>
            <Route path="" element={<Shop/>}/>                
            <Route path="list/:category" element={<ShopList />} />
            <Route path="product/:pd_category/:pd_no" element={<Product/>}/>                
        </Routes>
    );
}
export default Store;