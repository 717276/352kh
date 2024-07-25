import '../../components/css/admin/ProductRegister.css';
import productImage from './test.jpg';

const ProductRegister = () => {
  return (
    <>
    <div className='ProductRegister'>
      <h3>상품등록</h3>
      <div className='ProductRegisterTable'>
        <table>
          <tr>
            <td rowSpan={6}>
              <img src={productImage} alt=""/>
            </td>
            <td>상품명</td>
            <td><input type="text" name="" id="" /></td>
          </tr>
          <tr>
            <td>상품설명</td>
            <td>
              <textarea name="" id=""></textarea>
            </td>
          </tr>
          <tr>
            <td>상품수량</td>
            <td>
              <input type="number" />
            </td>
          </tr>
          <tr>
            <td>상품가격</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>할인율</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>상세이미지</td>
            <td>
              <input type="file" name="myfile"/>
            </td>
          </tr>
        </table>
      </div>
    </div>
    </>
  );
};

export default ProductRegister;