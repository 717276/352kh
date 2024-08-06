import '../../components/css/admin/ProductRegister.css';
import productImage from './test.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const ProductModify = () => {
  const nav = useNavigate();
  const pdName = useRef();
  const pdExplain = useRef();
  const pdMount = useRef();
  const pdPrice = useRef();
  const pdDiscount = useRef();
  const [price, setPrice] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [items, setItems] = useState({});
  const { pdNo } = useParams();
  const imgRef = useRef();
  const detailImagesRef = useRef();

  useEffect(() => {
    const url = `http://localhost:8080/api/admin/productModify/${pdNo}`;
    console.log(pdNo);
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setItems(data);
      })
  }, []);

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
              <li onClick={() => { nav('/admin/productList') }}>상품관리</li>
              <li onClick={() => { nav('/admin/chart') }}>분석</li>
            </ul>
          </div>
        </div>
        <div className='ProductRegisterTable'>
          <input type="hidden" value={items.pdNo || ''} readOnly />
          <input type="hidden" value={items.filename} readOnly />
          <table>
            <tbody>
              <tr>
                <td rowSpan={5}>
                  <img src={`/images/shop/${items.filename}.jpg`} alt="image" />
                </td>
                <td>상품명</td>
                <td colSpan={2}><input type="text" ref={pdName} defaultValue={items.pdName} /></td>
              </tr>
              <tr>
                <td>상품설명</td>
                <td colSpan={2}>
                  <textarea ref={pdExplain} defaultValue={items.pdExplain}></textarea>
                </td>
              </tr>
              <tr>
                <td>상품수량</td>
                <td colSpan={2}>
                  <input type="number" min={0} ref={pdMount} defaultValue={items.pdMount} />
                </td>
              </tr>
              <tr>
                <td>가격</td>
                <td colSpan={2}>
                  <input type="text" ref={pdPrice} onChange={handlePriceChange} defaultValue={items.pdPrice} />
                </td>
              </tr>
              <tr>
                <td>할인율(%)/판매가</td>
                <td>
                  <input type="number" ref={pdDiscount} min={0} onChange={handleDiscountRateChange} defaultValue={items.pdDiscount} />
                </td>
                <td>
                  <input type="text" id="price" name='price' value={items.pdPrice * (1 - items.pdDiscount / 100)} readOnly />
                </td>
              </tr>
              <tr>
                <td><input type="file" ref={imgRef} /></td>
                <td>상세이미지</td>
                <td colSpan={2}>
                  <input type="file" ref={detailImagesRef} multiple />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='ProductRegisterButton'>
          <button id='saveButton' onClick={() => {
            const form = new FormData();
            form.append('pdNo', pdNo);
            form.append('pdName', pdName.current.value);
            form.append('pdExplain', pdExplain.current.value);
            form.append('pdMount', pdMount.current.value);
            form.append('pdPrice', pdPrice.current.value);
            form.append('pdDiscount', pdDiscount.current.value);
            // 대표 이미지
            if (imgRef.current.files.length > 0) {
              form.append('img', imgRef.current.files[0]); // 대표 이미지는 하나만 전송
            }
            // 상세 이미지 (다중 파일)
            if (detailImagesRef.current.files.length > 0) {
              Array.from(detailImagesRef.current.files).forEach(file => {
                form.append('detailImages', file); // 상세 이미지는 다중 파일 전송
              });
            }
            fetch('http://localhost:8080/api/admin/product/update', {
              method: 'post',
              body: form
            }).then(() => {
              nav('/admin/productList');
            });
          }}>수정</button>
          <button id="deleteButton" onClick={() => {
            if (window.confirm('삭제할까요?')) {
              const form = new FormData();
              form.append('pdNo', items.pdNo);
              fetch('http://localhost:8080/api/admin/product/delete', {
                method: 'post',
                body: form
              }).then(() => {
                nav('/admin/productList');
              })
            }
          }
          }>삭제</button>
          <button id='normalButton' onClick={() => { nav(-1) }}>취소</button>
        </div>
      </div>
    </>
  );
};

export default ProductModify;
