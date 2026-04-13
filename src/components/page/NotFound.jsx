import React from "react";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center gap-4 text-center">
                <ExclamationCircleOutlined
                    style={{ fontSize: "48px", color: "#ff4d4d" }}
                    className="text-red-500"
                />
                <h1 className="text-2xl font-bold text-gray-800">
                    404 - Không tìm thấy trang
                </h1>
                <p className="text-base text-gray-600">
                    Trang bạn đang tìm kiếm không tồn tại.
                </p>
                <p className="text-base text-gray-600">
                    Trở về{" "}
                    <Link to="/" className="text-blue-500">
                        Trang Chủ
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default NotFound;
