import '../../components/css/admin/ProductRegister.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

const ProductRegister = () => {
  const nav = useNavigate();
  const pdName = useRef();
  const pdCategory = useRef();
  const pdExplain = useRef();
  const pdMount = useRef();
  const pdPrice = useRef();
  const pdDiscount = useRef();
  const [price, setPrice] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const imgRef = useRef();
  const detailImagesRef = useRef();

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
        <h3>상품 등록 및 수정</h3>
        <div className='mg_box'>
          <div className='mg_mangeMenu'>
            <ul>
              <li onClick={() => { nav() }}>회원관리</li>
              <li onClick={() => { nav() }}>여행관리</li>
              <li onClick={() => { nav('/admin/getProductList') }}>상품관리</li>
              <li onClick={() => { nav('/admin/chart') }}>분석</li>
            </ul>
          </div>
        </div>
        <div className='ProductRegisterTable'>
          <table>
            <tbody>
              <tr>
                <td>카테고리</td>
                <td colSpan={3}>
                  <select ref={pdCategory}>
                    <option value="0">위생용품</option>
                    <option value="1">간식 및 사료</option>
                    <option value="2">강아지옷</option>
                    <option value="3">악세사리</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>상품명</td>
                <td colSpan={2}><input type="text" ref={pdName} /></td>
              </tr>
              <tr>
                <td>상품설명</td>
                <td colSpan={2}>
                  <textarea ref={pdExplain} ></textarea>
                </td>
              </tr>
              <tr>
                <td>상품수량</td>
                <td colSpan={2}>
                  <input type="number" min={0} ref={pdMount} />
                </td>
              </tr>
              <tr>
                <td>가격</td>
                <td colSpan={2}>
                  <input type="text" ref={pdPrice} onChange={handlePriceChange} />
                </td>
              </tr>
              <tr>
                <td>할인율(%)/판매가</td>
                <td>
                  <input type="number" ref={pdDiscount} min={0} onChange={handleDiscountRateChange} />
                </td>
                <td>
                  <input type="text" id="price" name='price' readOnly />
                </td>
              </tr>
              <tr>
                <td>대표이미지</td>
                <td colSpan={3}><input type="file" ref={imgRef} /></td>
              </tr>
              <tr>
                <td>상세이미지</td>
                <td colSpan={3}>
                  <input type="file" ref={detailImagesRef} multiple />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='ProductRegisterButton'>
          <button id='saveButton' onClick={() => {
            const form = new FormData();
            form.append('pd_name', pdName.current.value);
            form.append('pd_explain', pdExplain.current.value);
            form.append('pd_mount', pdMount.current.value);
            form.append('pd_price', pdPrice.current.value);
            form.append('pd_discount', pdDiscount.current.value);
            form.append('pd_category', pdCategory.current.value);
            // 대표 이미지
            if (imgRef.current.files.length > 0) {
              form.append('image', imgRef.current.files[0]); // 대표 이미지는 하나만 전송
            }
            // 상세 이미지 (다중 파일)
            if (detailImagesRef.current.files.length > 0) {
              Array.from(detailImagesRef.current.files).forEach(file => {
                form.append('detailImages', file); // 상세 이미지는 다중 파일 전송
              });
            }
            fetch('http://localhost:8080/api/admin/product/insert', {
              method: 'post',
              body: form
            }).then(() => {
              nav('/admin/productList');
            });
          }}>등록</button>
          <button id='deleteButton' onClick={() => { nav('/admin/productList') }}>취소</button>
        </div>
      </div>
    </>
  );
};

export default ProductRegister;
