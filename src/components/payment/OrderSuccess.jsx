import React from "react";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="container">
      <div className="order-box">
        <div className="icon">✅</div>
        <h2 className="title">Cảm ơn bạn đã đặt hàng!</h2>
        <p className="message">
          Bạn sẽ nhận được thông tin cập nhật trong hộp thư đến thông báo.
        </p>
        <button className="order-button">Xem đơn hàng</button>
        <div className="voucher-box">
          <p className="voucher-text">
            Bạn có <span className="highlight">5 voucher!</span>
          </p>
          <p className="discount">Giảm tổng cộng 2.399.000đ</p>
          <p className="voucher-detail">
            1 voucher vận chuyển + 4 voucher giảm giá
          </p>
        </div>
        <button className="shop-button">Nhận và mua sắm ngay</button>
      </div>
    </div>
  );
};

export default OrderSuccess;
