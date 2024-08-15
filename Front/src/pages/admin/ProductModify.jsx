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
  const [items, setItems] = useState([]);
  const { pd_no } = useParams();
  const imgRef = useRef();
  const detailImagesRef = useRef();
  const [showImages, setShowImages] = useState([]);
  const [showImages2, setShowImages2] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const url = `http://localhost:8080/api/admin/productModify/${pd_no}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setItems(data[0]);
          setImageList(data[0].img_list);

          if (data[0].img_list && data[0].img_list.length > 0) {
            const firstImageRefNo = data[0].img_list[0].i_ref_no;
            setShowImages2([`/images/shop/product_${firstImageRefNo}_1.jpg`]);
          } else {
            setShowImages2(['/images/shop/product_default.jpg']);
          }
          setPrice(data[0].pd_price);
          setDiscountRate(data[0].pd_discount);
        } else {
          setShowImages2(['/images/shop/product_default.jpg']);
        }
      });
  }, [pd_no]);

  useEffect(() => {
    const numericPrice = parseFloat(price) || 0;
    const numericDiscountRate = parseFloat(discountRate) || 0;
    const calculatedFinalPrice = numericPrice * (1 - numericDiscountRate / 100);
    setFinalPrice(Math.floor(calculatedFinalPrice));
  }, [price, discountRate]);

  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    setShowImages(imageUrlLists);
  };

  const handleAddImages2 = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    setShowImages2(imageUrlLists);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDiscountRateChange = (e) => {
    setDiscountRate(e.target.value);
  };

  return (
    <>
      <div className='ProductRegister'>
        <h3>상품 등록 및 수정</h3>
        <div className='mg_box'>
          <div className='mg_mangeMenu'>
            <ul>
              <li onClick={() => { nav('/admin') }}>회원관리</li>
              <li onClick={() => { nav('/admin/tripList') }}>여행관리</li>
              <li onClick={() => { nav('/admin/productList') }}>상품관리</li>
              <li onClick={() => { nav('/admin/chart') }}>분석</li>
              <li onClick={()=>{nav('/admin/chat/list')}}>Faq관리</li>
            </ul>
          </div>
        </div>
        <div className='ProductRegisterTable'>
          <input type="hidden" value={items.pd_no} readOnly />
          <input type="hidden" value={items.filename} readOnly />
          <table>
            <tbody>
              <tr>
                <td colSpan={5}>
                  <select ref={pdCategory} value={items.pd_category || ''} onChange={(e) => setItems(prevItems => ({ ...prevItems, pd_category: e.target.value }))}>
                    <option value="0">위생용품</option>
                    <option value="1">간식 및 사료</option>
                    <option value="2">강아지옷</option>
                    <option value="3">악세사리</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td rowSpan={5}>
                  {showImages2.length > 0 ? (
                    showImages2.map((image, id) => (
                      <div className='imgcontainer' key={id}>
                        <img src={image} alt={`${image}-${id}`} />
                      </div>
                    ))
                  ) : (
                    <img src='/images/shop/product_default.jpg' alt="default" />
                  )}
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
                  <input type="text" ref={pdPrice} value={price} onChange={handlePriceChange} />
                </td>
              </tr>
              <tr>
                <td>할인율(%)/판매가</td>
                <td>
                  <input type="number" ref={pdDiscount} min={0} value={discountRate} onChange={handleDiscountRateChange} />
                </td>
                <td>
                  <input type="text" id="price" name='price' value={finalPrice} readOnly />
                </td>
              </tr>
              <tr>
                <td><input type="file" ref={imgRef} onChange={handleAddImages2} /></td>
                <td>상세이미지</td>
                <td colSpan={2}>
                  <input type="file" ref={detailImagesRef} multiple onChange={handleAddImages} />
                </td>
              </tr>
              <tr>
                <td id='imgtd' colSpan={4}>
                  {imageList.length > 0 ? (
                    imageList.map((image, index) => (
                      <img key={index} src={`/images/shop/${image.i_category}_${image.i_ref_no}_${image.i_order}.jpg`} />
                    ))
                  ) : (
                    <p>등록된 이미지가 없습니다.</p>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  {showImages.map((image, id) => (
                    <div className='imgcontainer' key={id}>
                      <img src={image} alt={`${image}-${id}`} />
                    </div>
                  ))}
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
              window.location.reload();
            });
          }}>수정</button>
          <button id="deleteButton" onClick={() => {
            if (window.confirm('삭제할까요?')) {
              const form = new FormData();
              form.append('pd_no', items.pd_no);

              fetch('http://localhost:8080/api/admin/product/delete', {
                method: 'POST',
                body: form
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('삭제에 실패했습니다. 주문건이 있는지 확인바랍니다.');
                  }
                  alert('삭제가 완료되었습니다.');
                  nav('/admin/productList');
                  window.location.reload();
                })
                .catch(error => {
                  alert(error.message);
                });
            }
          }}>삭제</button>

          <button id='normalButton' onClick={() => { nav('/admin/productList') }}>취소</button>
        </div>
      </div>
    </>
  );
};

export default ProductModify;
