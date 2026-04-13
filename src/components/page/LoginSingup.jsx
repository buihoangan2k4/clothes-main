import React, { useContext, useState } from "react";
import "./Css/LoginSingup.css";

import { loginUser } from "../utils/apiFunction";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { message } from "antd";
export const LoginSingup = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { handleLogin } = useContext(ShopContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginData = {
                userName,
                password,
                authProvider: "USER_NAME",
            };

            const response = await loginUser(loginData);

            alert("Đăng nhập thành công!");

            // Lưu userId và userName vào ShopContext
            handleLogin(response.data.userId, response.data.userName);

            message.success("Đăng nhập thành công!");
            navigate("/");
        } catch (err) {
            console.error("❌ Đăng nhập thất bại:", err);
            setError(err.message || "Đăng nhập không thành công!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Login</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="continue-btn">
                        Continue
                    </button>
                </form>

                <div className="social-divider">
                    or Connect With Social Media
                </div>

                <button
                    className="social-btn facebook-btn"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                    <span>Sign in With Facebook</span>
                </button>

                <button
                    className="social-btn gmail-btn"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#EA4335"
                            d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                        />
                        <path
                            fill="#34A853"
                            d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                        />
                        <path
                            fill="#4A90E2"
                            d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                        />
                    </svg>
                    <span>Sign in With Gmail</span>
                </button>
            </div>
        </div>
    );
};
