import '../../components/css/admin/ProductRegister.css';
import productImage from './test.jpg';
import { useNavigate } from 'react-router-dom';

const ProductRegister = () => {
  const nav = useNavigate();
  return (
    <>
    <div className='ProductRegister'>
      <h3>상품등록</h3>
      <div className='ProductRegisterTable'>
        <table>
          <tr>
            <td rowSpan={4}>
              <img src={productImage} alt=""/>              
            </td>
            <td>상품명</td>
            <td colSpan={2}><input type="text" name="" id="" /></td>
          </tr>
          <tr>
            <td>상품설명</td>
            <td colSpan={2}>
              <textarea name="" id=""></textarea>
            </td>
          </tr>
          <tr>
            <td>상품수량</td>
            <td colSpan={2}>
              <input type="number" />
            </td>
          </tr>
          <tr>
            <td>가격/할인율</td>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="number" />
            </td>
          </tr>
          <tr>
            <td><input type="file" name="myfile"/></td>
            <td>상세이미지</td>
            <td colSpan={2}>
              <input type="file" name="myfile"/>
            </td>
          </tr>
        </table>
      </div>
      <div className='ProductRegisterButton'>
        <button>등록</button>
        <button onClick={()=>{nav(-1)}}>취소</button>
      </div>
    </div>
    </>
  );
};

export default ProductRegister;