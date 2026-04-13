import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { axiosConfig } from "../utils/apiFunction";

const ProductDisplay = (props) => {
    const { product } = props;

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { userId, setAddCart } = useContext(ShopContext); // Lấy userId từ context
    const navigate = useNavigate();
    const [selectedVariantId, setSelectedVariantId] = useState(null); // Lưu size được chọn

    const handleSelectSize = (variantId) => {
        setSelectedVariantId(variantId);
    };

    const handleAddToCart = async () => {
        if (!userId) {
            setMessage("⚠️ Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
            setTimeout(() => {
                navigate("/loginSingup"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
            }, 2000);
            return;
        }

        if (!selectedVariantId) {
            setMessage("⚠️ Vui lòng chọn size trước khi thêm vào giỏ hàng!");
            return;
        }

        setLoading(true);
        setMessage("");

        const productCart = {
            userId,
            productId: product.productId,
            variantId: selectedVariantId,
            quantity: 1,
        };

        try {
            const response = await axiosConfig.post(
                `/cart/cart-item/${userId}`,
                productCart
            );
            setAddCart(response.data);
            setMessage("🛒 Đã thêm sản phẩm vào giỏ hàng!");
        } catch (error) {
            console.error("❌ Lỗi khi thêm vào giỏ hàng:", error);
            setMessage("❌ Lỗi khi thêm vào giỏ hàng!");
        } finally {
            setLoading(false);
        }
    };

    const primaryImage = product?.images[0];

    return (
        <div className="productDisplay">
            <div className="productDisplay-left">
                <div className="productDisplay-left-list">
                    {product.images?.length > 0 && (
                        <img
                            src={
                                primaryImage?.productImage ||
                                "/images/products/men1.png"
                            }
                            alt="Product"
                        />
                    )}
                </div>
            </div>

            <div className="productDisplay-right">
                <div className="productDisplay-right-name">
                    <h1>{product.productsName}</h1>
                    <h1>${product.price * 0.25}</h1>
                    <h1>{product.categoryName}</h1>
                    <p>Inventory: {product.stockQuantity}</p>
                </div>

                {/* Danh sách size */}
                <div className="productDisplay-right-size">
                    {product.variants?.map((variant) => (
                        <div
                            key={variant.variantId}
                            className={`size-option ${
                                selectedVariantId === variant.variantId
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() => handleSelectSize(variant.variantId)}
                        >
                            {variant.size}
                        </div>
                    ))}
                </div>

                {/* Nút thêm vào giỏ hàng */}
                <button
                    onClick={handleAddToCart}
                    className="productDisplay-right-btn"
                    disabled={loading || !selectedVariantId} // Chỉ cho phép bấm khi đã chọn size
                >
                    {loading ? "⏳ Đang thêm..." : "ADD TO CART"}
                </button>

                {message && <p className="cart-message">{message}</p>}

                <p className="productDisplay-right-text">
                    Discount: Giảm ngay 200.000 VNĐ / 1 sản phẩm 13De Marzo có
                    trị giá trên <br /> 2.000.000 đối với những khách hàng từng
                    mua tại Whatever!
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;
