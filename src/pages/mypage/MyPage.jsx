import React, { useState, useEffect } from 'react';
import '../../components/css/mypage/MyPage.css';
import profileImg from '../../images/profile/profile.png';
import place1 from '../../images/place/place1.png';
import place2 from '../../images/place/place2.png';
import place3 from '../../images/place/place3.png';
import productImg from '../../images/place/place1.png';

const MyPage = () => {
  const [editField, setEditField] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const [sortType, setSortType] = useState('latest');
  const [productSortType, setProductSortType] = useState('latest');
  const itemsPerPage = 5;

  const mockData = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    img: [place1, place2, place3][index % 3],
    name: ['투어 A', '투어 B', '투어 C'][index % 3],
    description: ['짧은 설명 A', '짧은 설명 B', '짧은 설명 C'][index % 3],
    startDate: '2023-01-01',
    endDate: '2023-01-05',
    price: `${(index + 1) * 10000}원`
  }));

  const productMockData = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    img: productImg,
    name: `상품 ${['A', 'B', 'C'][index % 3]}`,
    purchaseDate: '2023-01-01',
    quantity: index % 5 + 1,
    totalAmount: `${(index + 1) * 10000}원`,
    status: ['상품준비중', '배송중', '배송완료'][index % 3]
  }));

  const [sortedData, setSortedData] = useState([...mockData]);
  const [sortedProductData, setSortedProductData] = useState([...productMockData]);

  useEffect(() => {
    const sorted = [...mockData].sort((a, b) => {
      if (sortType === 'latest') {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });
    setSortedData(sorted);
  }, [sortType]);

  useEffect(() => {
    let filteredProducts = productMockData;
    if (productSortType === 'ready') {
      filteredProducts = productMockData.filter(product => product.status === '상품준비중');
    } else if (productSortType === 'shipping') {
      filteredProducts = productMockData.filter(product => product.status === '배송중');
    } else if (productSortType === 'completion') {
      filteredProducts = productMockData.filter(product => product.status === '배송완료');
    } else {
      filteredProducts = [...productMockData].sort((a, b) => b.id - a.id);
    }

    setSortedProductData(filteredProducts);
  }, [productSortType]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const totalProductPages = Math.ceil(sortedProductData.length / itemsPerPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangeProductPage = (page) => {
    setProductPage(page);
  };

  const toggleEditField = (field) => {
    setEditField(editField === field ? '' : field);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const productStartIndex = (productPage - 1) * itemsPerPage;
  const selectedProductItems = sortedProductData.slice(productStartIndex, productStartIndex + itemsPerPage);

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
              <li onClick={() => setSortType('latest')}>최신순</li>
              <li onClick={() => setSortType('oldest')}>오래된 순</li>
            </ul>
            {selectedItems.map((item) => (
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
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index + 1}
                className={`page-span ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handleChangePage(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
        <div className='MyPageProducts'>
          <h1>구매한 상품 목록</h1>
          <div className="product-list">
            <ul className='sort-type'>
              <li onClick={() => setProductSortType('latest')}>전체</li>
              <li onClick={() => setProductSortType('ready')}>상품준비중</li>
              <li onClick={() => setProductSortType('shipping')}>배송중</li>
              <li onClick={() => setProductSortType('completion')}>배송완료</li>
            </ul>
            {selectedProductItems.map((item) => (
              <div key={item.id} className="product-item">
                <div className="purchase-date">{item.purchaseDate}</div>
                <div className='product-info'>
                  <img src={item.img} alt={item.name} />
                  <div className="product-details">
                    <div className="product-name">{item.name}</div>
                    <div className="product-quantity">수량: {item.quantity}</div>
                    <div className="product-price">결제금액: {item.totalAmount}</div>
                    <div className={`product-status ${item.status}`}>{item.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: totalProductPages }, (_, index) => (
              <span
                key={index + 1}
                className={`page-span ${productPage === index + 1 ? 'active' : ''}`}
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
