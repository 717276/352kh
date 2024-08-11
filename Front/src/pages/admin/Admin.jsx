import {Routes, Route} from 'react-router-dom'
import ProductList from './ProductList'; 
import ProductRegister from './ProductRegister';
import Management from './Management';
const Admin=()=>{
    return(
        <Routes>
            <Route path="productList" element={<ProductList />} />    
            <Route path="productRegister" element={<ProductRegister />} /> 
            <Route path="management" element={<Management/>}/>            
        </Routes>
    );
}
export default Admin