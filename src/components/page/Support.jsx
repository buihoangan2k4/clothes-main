import React, { useState } from "react";
import "./Css/Support.css";
export const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    orderNumber: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra nếu form chưa nhập đầy đủ thông tin

    alert("Gửi yêu cầu thành công!");

    // Reset form sau khi gửi thành công
    setFormData({
      name: "",
      orderNumber: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-form-section">
        <h1 className="contact-title">CONTACT US</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <input
              type="text"
              name="orderNumber"
              placeholder="Order number"
              value={formData.orderNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Please Select
              </option>
              <option value="general">General Inquiry</option>
              <option value="order">Order Status</option>
              <option value="return">Return Request</option>
              <option value="technical">Technical Support</option>
            </select>
          </div>

          <div className="form-field">
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>

          <button
            type="button"
            className="chat-btn"
          >
            Chat
          </button>
        </form>
      </div>

      <div className="contact-info-section">
        <div className="support-hours">
          <h2>CUSTOMER SUPPORT HOURS</h2>
          <p>Monday – Friday 8:00am - 5:00pm</p>
        </div>
      </div>
    </div>
  );
};
