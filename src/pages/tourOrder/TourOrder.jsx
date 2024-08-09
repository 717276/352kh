import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment"; // 결제 컴포넌트 임포트
import "../../components/css/order/Order.css";
import { jwtDecode } from "jwt-decode";

const TourOrder = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [selectedTours, setSelectedTours] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    email: "",
    phone: "",
    postNo: "",
    basicAddress: "",
    detailAddress: "",
  });
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userNo = decodedToken.userNo;
  const [paymentInfo, setPaymentInfo] = useState({
    method: "card/easy", // 기본 결제 방법을 카드로 설정
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    fetchTourItems(userNo);
    loadDaumPostcodeScript();
  }, [userNo]);

  const fetchTourItems = (userNo) => {
    const url = `http://localhost:8080/api/tourOrder/${userNo}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTours(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching tour items:", error));
  };

  const fetchUserInfo = () => {
    const url = `http://localhost:8080/api/order/user/${userNo}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setOrderInfo({
          name: data.m_name,
          email: data.m_email,
          phone: "0" + data.m_phone,
          postNo: data.m_postNo,
          basicAddress: data.m_basicAddress,
          detailAddress: data.m_detailAddress,
        });
      })
      .catch((error) => console.error("Error fetching user info:", error));
  };

  const loadDaumPostcodeScript = () => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      console.log("Daum Postcode script loaded");
    };
    document.body.appendChild(script);
  };

  const handlePostcode = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data) => {
          setOrderInfo({
            ...orderInfo,
            postNo: data.zonecode,
            basicAddress: data.roadAddress,
          });
        },
      }).open();
    } else {
      console.error("Daum Postcode script not loaded yet");
    }
  };

  const handleSelectTour = (utl_no) => {
    if (selectedTours.includes(utl_no)) {
      setSelectedTours(selectedTours.filter((id) => id !== utl_no));
    } else {
      setSelectedTours([...selectedTours, utl_no]);
    }
  };

  const removeTour = (utl_no) => {
    const url = `http://localhost:8080/api/deleteTourCart/${utl_no}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTours(tours.filter((tour) => tour.utl_no !== utl_no));
          setSelectedTours(selectedTours.filter((id) => id !== utl_no));
        } else {
          console.error("Failed to delete tour item");
        }
      })
      .catch((error) => console.error("Error deleting tour item:", error));
  };

  const tourTotal = tours
    .filter((tour) => selectedTours.includes(tour.utl_no))
    .reduce((total, tour) => total + tour.tour.t_totalPrice, 0);

  const toggleAddressEditing = () => {
    setIsEditingAddress(!isEditingAddress);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentInfo({ ...paymentInfo, method: e.target.value });
  };

  const handleUseUserInfo = () => {
    fetchUserInfo();
  };

  const handleUpdateOrderInfo = () => {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let postNo = document.getElementById("postNo").value;
    let basicAddress = document.getElementById("basicAddress").value;
    let detailAddress = document.getElementById("detailAddress").value;
    console.log(name);
    console.log(phone);
    console.log(postNo);
    console.log(basicAddress);
    console.log(detailAddress);
    setOrderInfo({
      name,
      phone,
      postNo,
      basicAddress,
      detailAddress,
    });

    setIsEditingAddress(false);
  };

  const getImageUrl = (img) => {
    return `/images/${img.i_category}/${img.i_category}_${img.i_ref_no}_${img.i_order}.jpg`;
  };

  const isOrderInfoComplete = () => {
    console.log(orderInfo);
    return (
      orderInfo.name &&
      orderInfo.email &&
      orderInfo.phone &&
      orderInfo.postNo &&
      orderInfo.basicAddress &&
      orderInfo.detailAddress
    );
  };

  const handlePaymentSuccess = (response) => {
    if (selectedTours.length === 0) {
      alert("선택하신 투어가 없습니다.");
      return;
    }

    if (!isOrderInfoComplete()) {
      alert("주문자 정보 및 배송지 정보를 모두 입력해주세요.");
      return;
    }

    const paymentData = {
      userNo: userNo,
      orderItems: tours
        .filter((tour) => selectedTours.includes(tour.utl_no))
        .map((tour) => ({
          t_no: tour.tour.t_no,
          ot_price: tour.tour.t_totalPrice,
        })),
      payment: {
        payt_type: paymentInfo.method,
        payt_total: tourTotal,
      },
    };

    fetch("http://localhost:8080/api/tourOrder/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order saved successfully:", data);
        alert("결제에 성공하였습니다.");
        navigate(`/mypage`);
      })
      .catch((error) => {
        console.error("Error saving order:", error);
      });
  };

  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="Order">
      <div className="main-content">
        <div className="order-summary">
          <h2>주문상품 {tours.length}개</h2>
          <div className="products">
            {Array.isArray(tours) &&
              tours.map((tour) => (
                <div key={tour.utl_no} className="product">
                  <div className="item">
                    <input
                      type="checkbox"
                      checked={selectedTours.includes(tour.utl_no)}
                      onChange={() => handleSelectTour(tour.utl_no)}
                    />
                    <img
                      src={getImageUrl(tour.tour.img)}
                      alt={tour.tour.t_title}
                    />
                    <div className="product-info-order">
                      <span>{tour.tour.t_title}</span>
                      <span>{tour.tour.t_totalPrice.toLocaleString()}원</span>
                      <span>
                        {formatDateToYYYYMMDD(tour.tour.t_strDate)} ~{" "}
                        {formatDateToYYYYMMDD(tour.tour.t_endDate)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeTour(tour.utl_no)}
                  >
                    결제 취소
                  </button>
                </div>
              ))}
          </div>
          <div className="order-total">
            <div className="subtotal">
              <span>상품금액</span>
              <span>{tourTotal.toLocaleString()}원</span>
            </div>
            <hr className="divider" />
            <div className="total">
              <span>총 결제금액</span>
              <span>{tourTotal.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        <div className="order-info">
          <h2>
            주문자 정보 / 배송지 정보
            <div>
              <button
                className="edit-address-button"
                onClick={handleUseUserInfo}
              >
                정보 불러오기
              </button>
              <button
                className="edit-address-button"
                onClick={toggleAddressEditing}
              >
                {isEditingAddress ? "변경 취소" : "배송지 변경"}
              </button>
            </div>
          </h2>
          <div className="info-section">
            <div className="order-info-summary">
              <span>이름: {orderInfo.name}</span>
              <span>전화번호: {orderInfo.phone}</span>
              <span>
                주소: {orderInfo.basicAddress} {orderInfo.detailAddress}
              </span>
            </div>
            {isEditingAddress && (
              <div className="edit-address-section">
                <input
                  id="name"
                  type="text"
                  placeholder="이름"
                  defaultValue={orderInfo.name}
                />
                <input
                  id="phone"
                  type="text"
                  placeholder="전화번호"
                  defaultValue={orderInfo.phone}
                />
                <input
                  id="postNo"
                  type="text"
                  placeholder="우편번호"
                  defaultValue={orderInfo.postNo}
                />
                <input
                  id="basicAddress"
                  type="text"
                  placeholder="기본주소"
                  defaultValue={orderInfo.basicAddress}
                />
                <input
                  id="detailAddress"
                  type="text"
                  placeholder="상세주소"
                  defaultValue={orderInfo.detailAddress}
                />
                <div>
                  <button type="button" onClick={handlePostcode}>
                    우편번호 찾기
                  </button>
                  <button type="button" onClick={handleUpdateOrderInfo}>
                    변경하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="payment-summary">
        <div className="sticky">
          <div className="payment-method">
            <label>결제 방법 선택:</label>
            <select
              value={paymentInfo.method}
              onChange={handlePaymentMethodChange}
            >
              <option value="card/easy">카드/간편결제</option>
              <option value="trans">실시간 계좌이체</option>
              <option value="vbank">가상계좌</option>
              <option value="phone">휴대폰 결제</option>
            </select>
          </div>
          <div className="subtotal">
            <span>상품금액</span>
            <span>{tourTotal.toLocaleString()}원</span>
          </div>
          <hr className="divider" />
          <div className="total">
            <span>총 결제금액</span>
            <span>{tourTotal.toLocaleString()}원</span>
          </div>
          <Payment
            userNo={userNo}
            total={tourTotal}
            orderInfo={{
              ...orderInfo,
              address: `${orderInfo.basicAddress} ${orderInfo.detailAddress}`,
            }}
            paymentMethod={paymentInfo.method} // 결제 방법 전달
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentFailure={(error) =>
              alert(`결제에 실패하였습니다. 오류: ${error}`)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TourOrder;
