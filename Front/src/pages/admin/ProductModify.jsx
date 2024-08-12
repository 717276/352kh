import '../../components/css/admin/ProductRegister.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const ProductModify = () => {
  const nav = useNavigate();
  const pdName = useRef();
  const pdExplain = useRef();
  const pdMount = useRef();
  const pdPrice = useRef();
  const pdDiscount = useRef();
  const pdCategory = useRef();
  const [price, setPrice] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [items, setItems] = useState({});
  const { pdNo } = useParams();
  const imgRef = useRef();
  const detailImagesRef = useRef();

  useEffect(() => {
    const url = `http://localhost:8080/api/admin/productModify/${pdNo}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setItems(data);
        console.log(data);
      })
  }, [pdNo]);

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

  const getImageUrl = () => {
    if (items.img && items.img.i_ref_no) {
      return `/images/shop/product_${items.img.i_ref_no}_1.jpg`;
    } else {
      return '/images/shop/default.jpg';
    }
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
          <input type="hidden" value={items.pd_no || ''} readOnly />
          <input type="hidden" value={items.filename} readOnly />
          <table>
            <tbody>
              <tr>
                <td colSpan={5}>
                  <select ref={pdCategory} value={items.pd_category || ''} onChange={(e) => setItems(prevItems => ({ ...prevItems, pdCategory: e.target.value }))}>
                    <option value="0">위생용품</option>
                    <option value="1">간식 및 사료</option>
                    <option value="2">강아지옷</option>
                    <option value="3">악세사리</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td rowSpan={5}>
                  <img src={getImageUrl()} alt="image" />
                </td>
                <td>상품명</td>
                <td colSpan={2}><input type="text" ref={pdName} defaultValue={items.pd_name} /></td>
              </tr>
              <tr>
                <td>상품설명</td>
                <td colSpan={2}>
                  <textarea ref={pdExplain} defaultValue={items.pd_explain}></textarea>
                </td>
              </tr>
              <tr>
                <td>상품수량</td>
                <td colSpan={2}>
                  <input type="number" min={0} ref={pdMount} defaultValue={items.pd_mount} />
                </td>
              </tr>
              <tr>
                <td>가격</td>
                <td colSpan={2}>
                  <input type="text" ref={pdPrice} onChange={handlePriceChange} defaultValue={items.pd_price} />
                </td>
              </tr>
              <tr>
                <td>할인율(%)/판매가</td>
                <td>
                  <input type="number" ref={pdDiscount} min={0} onChange={handleDiscountRateChange} defaultValue={items.pd_discount} />
                </td>
                <td>
                  <input type="text" id="price" name='price' value={items.pd_price * (1 - items.pd_discount / 100)} readOnly />
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
            form.append('pd_no', items.pd_no);
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
              console.log(items.pdNo);
              form.append('pd_no', items.pd_no);
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
