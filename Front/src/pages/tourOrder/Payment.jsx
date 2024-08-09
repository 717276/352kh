import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = ({
  userNo,
  total,
  orderInfo,
  paymentMethod,
  onPaymentSuccess,
  onPaymentFailure,
}) => {
  const navigate = useNavigate();

  const isOrderInfoComplete = () => {
    console.log(orderInfo);
    return (
      orderInfo.name &&
      orderInfo.phone &&
      orderInfo.postNo &&
      orderInfo.basicAddress &&
      orderInfo.detailAddress
    );
  };

  const handlePayment = () => {
    if (!isOrderInfoComplete()) {
      alert("주문자 정보 및 배송지 정보를 모두 입력해주세요.");
      return;
    }

    const { IMP } = window;
    if (!IMP) {
      console.error("IMP 객체를 찾을 수 없습니다.");
      return;
    }

    IMP.init("imp19424728"); // 테스트용 가맹점 식별코드

    // PG사 설정
    let pg = "html5_inicis"; // 기본 테스트용 PG사
    switch (paymentMethod) {
      case "trans":
        pg = "html5_inicis";
        break;
      case "vbank":
        pg = "html5_inicis";
        break;
      case "phone":
        pg = "html5_inicis";
        break;
      default:
        pg = "html5_inicis";
    }

    const data = {
      pg: pg,
      pay_method: paymentMethod,
      merchant_uid: `mid_${new Date().getTime()}`,
      name: "주문명:결제테스트",
      amount: total,
      buyer_email: orderInfo.email,
      buyer_name: orderInfo.name,
      buyer_tel: orderInfo.phone,
      buyer_addr: orderInfo.address,
      buyer_postcode: orderInfo.postNo,
      m_redirect_url: `http://localhost:5173/mypage`, // 결제 완료 후 리디렉션될 페이지
    };

    console.log("결제 요청 데이터:", data);

    IMP.request_pay(data, (response) => {
      console.log("결제 응답:", response);
      if (response.success) {
        onPaymentSuccess(response);
        alert("결제에 성공하였습니다.");
        navigate(`/mypage`);
      } else {
        onPaymentFailure(response.error_msg);
      }
    });
  };

  return <button onClick={handlePayment}>결제하기</button>;
};

export default Payment;
