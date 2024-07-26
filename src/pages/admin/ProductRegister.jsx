import '../../components/css/admin/ProductRegister.css';
import productImage from './test.jpg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProductRegister = () => {
  const nav = useNavigate();
  const [price, setPrice] = useState('');
  const [discountRate, setDiscountRate] = useState(0);

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    updateFinalPrice(e.target.value, discountRate);
  };

  const handleDiscountRateChange = (e) => {
    setDiscountRate(e.target.value);
    updateFinalPrice(price, e.target.value);
  };

  const updateFinalPrice = (price, discountRate) => {
    const finalPrice = price * (1 - discountRate / 100);
    document.getElementById('price').value = finalPrice;
  };

  return (
    <>
      <div className='ProductRegister'>
        <h3>상품등록</h3>
        <div className='ProductRegisterTable'>
          <table>
            <tbody>
              <tr>
                <td rowSpan={5}>
                  <img src={productImage} alt="" />
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
                  <input type="number" min={0} />
                </td>
              </tr>
              <tr>
                <td>가격</td>
                <td colSpan={2}>
                  <input type="text" onChange={handlePriceChange} />
                </td>
              </tr>
              <tr>
                <td>할인율(%)/판매가</td>
                <td>
                  <input type="number" min={0} onChange={handleDiscountRateChange} />
                </td>
                <td>
                  <input type="text" id="price" name='price' readOnly />
                </td>
              </tr>
              <tr>
                <td><input type="file" name="myfile" /></td>
                <td>상세이미지</td>
                <td colSpan={2}>
                  <input type="file" name="myfile" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='ProductRegisterButton'>
          <button>등록</button>
          <button onClick={() => { nav(-1) }}>취소</button>
        </div>
      </div>
    </>
  );
};

export default ProductRegister;
