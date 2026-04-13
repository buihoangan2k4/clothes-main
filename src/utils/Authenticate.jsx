import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Authenticate({ children }) {
    const [hasUserId, setHasUserId] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (userId) {
            setHasUserId(true);
        } else {
            message.error("Vui lòng đăng nhập để truy cập trang này");
            navigate("/loginSingup");
        }
    }, [navigate]);

    return hasUserId ? children : null;
}
