import React, { useState, useEffect } from 'react';
import '../../components/css/mypage/MyPage.css';
import profileImg from '../../images/profile/profile.png';
import place1 from '../../images/place/place1.png';
import place2 from '../../images/place/place2.png';
import place3 from '../../images/place/place3.png';

const MyPage = () => {
  const [editField, setEditField] = useState('');
  const [tripCurrentPage, setTripCurrentPage] = useState(1);
  const [productCurrentPage, setProductCurrentPage] = useState(1);
  const [tripSortType, setTripSortType] = useState('latest');
  const [productSortType, setProductSortType] = useState('latest');
  const itemsPerPage = 5;

  const mockTripData = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    img: [place1, place2, place3][index % 3],
    name: ['투어 A', '투어 B', '투어 C'][index % 3],
    description: ['짧은 설명 A', '짧은 설명 B', '짧은 설명 C'][index % 3],
    startDate: '2023-01-01',
    endDate: '2023-01-05',
    price: `${(index + 1) * 10000}원`
  }));

  const mockProductData = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    img: [place1, place2, place3][index % 3],
    name: ['상품 A', '상품 B', '상품 C'][index % 3],
    purchaseDate: '2023-01-01',
    quantity: Math.floor(Math.random() * 10) + 1,
    price: `${(index + 1) * 5000}원`,
    status: ['상품준비중', '배송중', '배송완료'][index % 3]
  }));

  const [sortedTripData, setSortedTripData] = useState([...mockTripData]);
  const [sortedProductData, setSortedProductData] = useState([...mockProductData]);

  useEffect(() => {
    const sortedTrips = [...mockTripData].sort((a, b) => {
      if (tripSortType === 'latest') {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });
    setSortedTripData(sortedTrips);
  }, [tripSortType]);

  useEffect(() => {
    const sortedProducts = [...mockProductData].sort((a, b) => {
      if (productSortType === 'latest') {
        return b.id - a.id;
      } else if (productSortType === 'oldest') {
        return a.id - b.id;
      } else {
        return a.status.localeCompare(b.status);
      }
    });
    setSortedProductData(sortedProducts);
  }, [productSortType]);

  const tripTotalPages = Math.ceil(sortedTripData.length / itemsPerPage);
  const productTotalPages = Math.ceil(sortedProductData.length / itemsPerPage);

  const handleChangeTripPage = (page) => {
    setTripCurrentPage(page);
  };

  const handleChangeProductPage = (page) => {
    setProductCurrentPage(page);
  };

  const toggleEditField = (field) => {
    setEditField(editField === field ? '' : field);
  };

  const tripStartIndex = (tripCurrentPage - 1) * itemsPerPage;
  const selectedTrips = sortedTripData.slice(tripStartIndex, tripStartIndex + itemsPerPage);

  const productStartIndex = (productCurrentPage - 1) * itemsPerPage;
  const selectedProducts = sortedProductData.slice(productStartIndex, productStartIndex + itemsPerPage);

  return (
    <>
      <div className='MyPage'>
        <h1>마이페이지</h1>
        <div className="MyPageInfo">
          <form action="#">
            <div className="myinfo">
              <div className="info-section">
                <table className="mypage-table">
                  <tbody>
                    <tr>
                      <td>ID</td>
                      <td>
                        <div className='my-info'>
                          <div className='my-infodesc'>매튜</div>
                          {editField !== 'id' && (
                            <button type="button" onClick={() => toggleEditField('id')}>변경</button>
                          )}
                        </div>
                        {editField === 'id' && (
                          <div className="edit-field">
                            <input type="text" placeholder="새 ID" /><br />
                            <span className="edit-description">사용하실 ID를 입력해주세요.</span>
                            <div className="edit-buttons">
                              <button type="submit">변경</button>
                              <button type="button" onClick={() => toggleEditField('id')}>취소</button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>email@gmail.com</td>
                    </tr>
                    <tr>
                      <td>주소</td>
                      <td>
                        <div className='my-info'>
                          <div className='my-infodesc'>
                          우편번호: 11111 <br />
                          기본주소: 서울특별시 강남구 호산빌딩 5층<br />
                          상세주소: 502호
                          </div>
                          {editField !== 'address' && (
                          <button type="button" onClick={() => toggleEditField('address')}>변경</button>
                        )}
                        </div>
                        {editField === 'address' && (
                          <div className="edit-field">
                            <div className="searchAddr">
                              <div className="addrInput"> 
                                <input type="text" placeholder="새 우편번호" />
                                <input type="text" placeholder="새 기본주소" />
                                <input type="text" placeholder="새 상세주소" />
                              </div>
                              <button type="button" className="zip-code-button">우편번호 찾기</button><br />
                            </div>
                            <div className="edit-buttons">
                              <button type="submit">변경</button>
                              <button type="button" onClick={() => toggleEditField('address')}>취소</button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>연락처</td>
                      <td>
                        <div className='my-info'>
                          <div className='my-infodesc'> 01011111111</div>
                          {editField !== 'phone' && (
                            <button type="button" onClick={() => toggleEditField('phone')}>변경</button>
                          )}
                        </div>
                        {editField === 'phone' && (
                          <div className="edit-field">
                            <input type="text" placeholder="새 전화번호" /><br />
                            <span className="edit-description">사용하실 전화번호를 입력해주세요.</span>
                            <div className="edit-buttons">
                              <button type="submit">변경</button>
                              <button type="button" onClick={() => toggleEditField('phone')}>취소</button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>강아지 이름</td>
                      <td>
                        <div className='my-info'>
                          <div className='my-infodesc'>초코</div>
                          {editField !== 'dogName' && (
                          <button type="button" onClick={() => toggleEditField('dogName')}>변경</button>
                          )}
                        </div>
                        {editField === 'dogName' && (
                          <div className="edit-field">
                            <input type="text" placeholder="새 강아지 이름" /><br />
                            <span className="edit-description"> 강아지 이름을 입력해주세요.</span>
                            <div className="edit-buttons">
                              <button type="submit">변경</button>
                              <button type="button" onClick={() => toggleEditField('dogName')}>취소</button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>강아지 종</td>
                      <td>
                        <div className='my-info'>
                          <div className='my-infodesc'>시츄</div>
                          {editField !== 'dogBreed' && (
                          <button type="button" onClick={() => toggleEditField('dogBreed')}>변경</button>
                          )}
                        </div>
                        {editField === 'dogBreed' && (
                          <div className="edit-field">
                            <input type="text" placeholder="새 강아지 종" /><br />
                            <span className="edit-description"> 강아지 종을 입력해주세요.</span>
                            <div className="edit-buttons">
                              <button type="submit">변경</button>
                              <button type="button" onClick={() => toggleEditField('dogBreed')}>취소</button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>강아지 크기</td>
                      <td>
                        <div className='my-info'>
                          <div className='my-infodesc'>소형견</div>
                          {editField !== 'dogSize' && (
                          <button type="button" onClick={() => toggleEditField('dogSize')}>변경</button>
                          )}
                        </div>                    
                        {editField === 'dogSize' && (
                          <div className="edit-field">
                            <div className='size-choice'>
                              <span><label htmlFor="large">대형견</label> <input type="radio" name="size" id="large"/></span>
                              <span><label htmlFor="medium">중형견</label> <input type="radio" name="size" id="medium"/></span>
                              <span><label htmlFor="small">소형견</label> <input type="radio" name="size" id="small"/></span>
                            </div>
                            <div className="edit-buttons">
                              <button type="submit">변경</button>
                              <button type="button" onClick={() => toggleEditField('dogSize')}>취소</button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="image-section">
                <div className="image-box">
                  <img src={profileImg} alt="프로필 이미지" />
                </div>
                <input type="file" id="file" style={{ display: 'none' }} />
                <label htmlFor="file" className="image-change">이미지 변경</label>
              </div>
            </div>
          </form>
        </div>
        <div className='MyPageTrip'>
          <h1>나의 투어리스트</h1>
          <div className="trip-list">
            <ul className='sort-type'>
              <li onClick={() => setTripSortType('latest')}>최신순</li>
              <li onClick={() => setTripSortType('oldest')}>오래된 순</li>
            </ul>
            {selectedTrips.map((item) => (
              <div key={item.id} className="trip-item">
                <img src={item.img} alt={item.name} />
                <div className="trip-details">
                  <div className="trip-name">{item.name}</div>
                  <div className="trip-description">{item.description}</div>
                  <div className="trip-date">{item.startDate} - {item.endDate}</div>
                  <div className="trip-price">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: tripTotalPages }, (_, index) => (
              <span
                key={index + 1}
                className={`page-span ${tripCurrentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handleChangeTripPage(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
        <div className='MyPageProducts'>
          <h1>나의 상품 목록</h1>
          <ul className='sort-type'>
            <li onClick={() => setProductSortType('latest')}>최신순</li>
            <li onClick={() => setProductSortType('oldest')}>오래된 순</li>
            <li onClick={() => setProductSortType('status')}>배송상태</li>
          </ul>
          <div className="product-list">
            {selectedProducts.map((item) => (
              <div key={item.id} className="product-item">
                <div className="product-date">{item.purchaseDate}</div>
                <img src={item.img} alt={item.name} />
                <div className="product-details">
                  <div className="product-name">{item.name}</div>
                  <div className="product-quantity">수량: {item.quantity}</div>
                  <div className="product-price">결제금액: {item.price}</div>
                  <div className={`product-status ${item.status}`}>{item.status}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: productTotalPages }, (_, index) => (
              <span
                key={index + 1}
                className={`page-span ${productCurrentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handleChangeProductPage(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;