import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Payment from "./Payment"; // 결제 컴포넌트 임포트
import "../../components/css/order/Order.css";

const Order = () => {
  const { userNo } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    email: "",
    phone: "",
    postNo: "",
    basicAddress: "",
    detailAddress: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: "card/easy", // 기본 결제 방법을 카드로 설정
  });

  const [showDiscountDetails, setShowDiscountDetails] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    fetchOrderItems();
    loadDaumPostcodeScript();
  }, [userNo]);

  const fetchOrderItems = () => {
    const url = `http://localhost:8080/api/order/${userNo}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching order items:", error));
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

  const productTotal = products.reduce(
    (total, product) => total + product.product.pd_price * product.ci_quantity,
    0
  );

  const discountTotal = products.reduce(
    (total, product) =>
      total +
      (product.product.pd_price *
        product.ci_quantity *
        product.product.pd_discount) /
        100,
    0
  );

  const removeProduct = (ciNo) => {
    const url = `http://localhost:8080/api/deleteCart/${ciNo}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((product) => product.ci_no !== ciNo));
        } else {
          console.error("Failed to delete cart item");
        }
      })
      .catch((error) => console.error("Error deleting cart item:", error));
  };

  const total = productTotal - discountTotal;

  const toggleDiscountDetails = () => {
    setShowDiscountDetails(!showDiscountDetails);
  };

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
    return `/images/${img.i_category}/${img.i_category}_${img.i_ref_no}_${img.i_order}.png`;
  };

  const isOrderInfoComplete = () => {
    return (
      orderInfo.name &&
      orderInfo.phone &&
      orderInfo.postNo &&
      orderInfo.basicAddress &&
      orderInfo.detailAddress
    );
  };

  const handlePaymentSuccess = (response) => {
    if (!isOrderInfoComplete()) {
      alert("주문자 정보 및 배송지 정보를 모두 입력해주세요.");
      return;
    }

    const paymentData = {
      userNo: userNo, // orderInfo.userNo 대신 userNo 사용
      orderItems: products.map((product) => ({
        pd_no: product.product.pd_no,
        oi_price: Math.round(
          product.product.pd_price * (1 - product.product.pd_discount / 100)
        ),
        oi_quantity: product.ci_quantity,
        oi_basicAddress: orderInfo.basicAddress,
        oi_detailAddress: orderInfo.detailAddress,
        oi_postNo: orderInfo.postNo,
      })),
      payment: {
        pay_type: paymentInfo.method,
        pay_total: total,
      },
    };

    fetch("http://localhost:8080/api/order/save", {
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
        navigate(`/mypage/${userNo}`);
      })
      .catch((error) => {
        console.error("Error saving order:", error);
      });
  };

  return (
    <div className="Order">
      <div className="main-content">
        <div className="order-summary">
          <h2>주문상품 {products.length}개</h2>
          <div className="products">
            {Array.isArray(products) &&
              products.map((product) => (
                <div key={product.ci_no} className="product">
                  <div className="item">
                    <img
                      src={getImageUrl(product.product.img)}
                      alt={product.product.pd_name}
                    />
                    <div className="product-info-order">
                      <span>{product.product.pd_name}</span>
                      <span>
                        {product.product.pd_price.toLocaleString()}원 /{" "}
                        {product.ci_quantity}개
                      </span>
                    </div>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeProduct(product.ci_no)}
                  >
                    구매 취소
                  </button>
                </div>
              ))}
          </div>
          <div className="order-total">
            <div className="subtotal">
              <span>상품금액</span>
              <span>{productTotal.toLocaleString()}원</span>
            </div>
            <div className="discount">
              <span>할인금액</span>
              <span>-{discountTotal.toLocaleString()}원</span>
            </div>
            <hr className="divider" />
            <div className="total">
              <span>총 결제금액</span>
              <span>{total.toLocaleString()}원</span>
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
            <span>{productTotal.toLocaleString()}원</span>
          </div>
          <div className="discount">
            <span>
              할인금액
              <span className="discount-toggle" onClick={toggleDiscountDetails}>
                {showDiscountDetails ? "▲" : "▼"}
              </span>
            </span>
            <span>-{discountTotal.toLocaleString()}원</span>
          </div>
          {showDiscountDetails && (
            <div className="discount-details">
              {products.map((product, index) => {
                const discountAmount =
                  (product.product.pd_price *
                    product.ci_quantity *
                    product.product.pd_discount) /
                  100;
                return (
                  <div key={index}>
                    <span>{product.product.pd_name} 할인</span>
                    <span>-{discountAmount.toLocaleString()}원</span>
                  </div>
                );
              })}
            </div>
          )}
          <hr className="divider" />
          <div className="total">
            <span>총 결제금액</span>
            <span>{total.toLocaleString()}원</span>
          </div>
          <Payment
            userNo={userNo}
            total={total}
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

export default Order;
