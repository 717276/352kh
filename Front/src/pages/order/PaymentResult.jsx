import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../components/css/order/PaymentResult.css";

const PaymentResult = () => {
  const location = useLocation();
  const { response, paymentMethod } = location.state || {};
  const navigate = useNavigate();

  return (
    <div className="payment-result">
      <h1>결제 결과</h1>
      {response ? (
        <div className="result-details">
          <p>결제가 성공적으로 완료되었습니다.</p>
          <p>결제 ID: {response.imp_uid}</p>
          <p>상태: {response.status}</p>
          <p>결제 금액: {response.paid_amount}원</p>
          <p>결제 타입: {paymentMethod}</p>
        </div>
      ) : (
        <p>결제 결과를 불러오지 못했습니다.</p>
      )}
      <button onClick={() => navigate("/mypage")} className="navigate-button">
        마이페이지로 이동
      </button>
    </div>
  );
};

export default PaymentResult;
