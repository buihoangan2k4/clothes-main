import React, { useContext, useEffect, useState } from "react";
import "./CartItem.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ShopContext } from "../context/ShopContext.jsx";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import productService from "../../services/productService.js";
import { axiosConfig } from "../utils/apiFunction.js";
import { parseApiData, parseApiNumber } from "../../utils/apiData.js";

const CartItem = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartItemTotals, setCartItemTotals] = useState({});
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const { userId } = useContext(ShopContext);

    const { data: products } = useQuery({
        queryKey: ["/products/available"],
        queryFn: productService.getProducts,
        select: (data) => {
            return parseApiData(data, []);
        },
    });
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axiosConfig.get(
                    `/cart/cart-items/${userId}`
                );
                const cartItemsArray = parseApiData(response.data, []);
                setCartItems(cartItemsArray);

                const totals = {};
                cartItemsArray?.forEach((item) => {
                    totals[item.cartItemID] = (
                        item.price *
                        item.quantity *
                        25
                    ).toFixed(2);
                });
                setCartItemTotals(totals);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        if (userId) {
            fetchCartItems();
        }
    }, [userId]);

    useEffect(() => {
        const fetchCartTotal = async () => {
            try {
                const response = await axiosConfig.get(`/cart/total/${userId}`);

                if (response.status === 200) {
                    const apiTotal = parseApiNumber(response.data, null);

                    if (apiTotal !== null) {
                        setCartTotalAmount(apiTotal * 25);
                    } else {
                        const total = cartItems.reduce(
                            (sum, item) =>
                                sum + item.price * item.quantity * 25,
                            0
                        );
                        setCartTotalAmount(total);
                    }
                }
            } catch (error) {
                console.error("Error fetching cart total:", error);
                const total = cartItems.reduce(
                    (sum, item) => sum + item.price * item.quantity * 25,
                    0
                );
                setCartTotalAmount(total);
            }
        };

        if (userId && cartItems?.length > 0) {
            fetchCartTotal();
        } else {
            setCartTotalAmount(0);
        }
    }, [userId, cartItems]);

    const updateCartQuantity = async (cartItemId, newQuantity) => {
        try {
            if (newQuantity < 1) return;

            const response = await axiosConfig.put(
                `/cart/cart-items/${cartItemId}`,
                { quantity: newQuantity }
            );

            if (response.status === 200) {
                const updatedItems = cartItems.map((item) =>
                    item.cartItemID === cartItemId
                        ? { ...item, quantity: newQuantity }
                        : item
                );

                setCartItems(updatedItems);

                const updatedItem = updatedItems.find(
                    (item) => item.cartItemID === cartItemId
                );
                if (updatedItem) {
                    const itemTotal = (
                        updatedItem.price *
                        updatedItem.quantity *
                        25
                    ).toFixed(2);
                    setCartItemTotals((prev) => ({
                        ...prev,
                        [cartItemId]: itemTotal,
                    }));
                }

                const newTotal = updatedItems.reduce(
                    (sum, item) => sum + item.price * item.quantity * 25,
                    0
                );
                setCartTotalAmount(newTotal);
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const response = await axiosConfig.delete(`/cart/cart-item/${itemId}`);
            if (response.status === 200) {
            }

            const updatedItems = cartItems.filter(
                (item) => item.cartItemID !== itemId
            );
            setCartItems(updatedItems);

            const newTotal = updatedItems.reduce(
                (sum, item) => sum + item.price * item.quantity * 25,
                0
            );
            setCartTotalAmount(newTotal);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    return (
        <div className="cartItem">
            <div className="cartItem-cartHeader">
                <p>Your Cart</p>
                <p>
                    Continue Shopping <hr />
                </p>
            </div>
            <div className="classIem-format-main classItem-bottom">
                <p>Product</p>
                <p>Quantity</p>
                <p>Total</p>
            </div>

            {cartItems?.length === 0 ? (
                <div className="empty-cart-message">Your cart is empty</div>
            ) : (
                cartItems?.map((item) => (
                    <div className="classIem-format-main" key={item.cartItemID}>
                        <div className="classIem-format-main-product">
                            <img
                                src={
                                    products?.find(
                                        (product) =>
                                            product.productId === item.productId
                                    )?.images[0]?.productImage
                                }
                                alt={item.productName}
                            />
                            <div className="classIem-format-main-product-right">
                                <p>{item.productName}</p>
                                <p style={{ fontWeight: "500" }}>
                                    {(item.price * 25).toLocaleString()}đ
                                </p>
                                <p>Size: {item.size}</p>
                            </div>
                        </div>

                        <div className="classIem-format-main-quanlity classIem-format-main-right">
                            <div className="classIem-format-main-quanlity-lerf">
                                <button
                                    onClick={() =>
                                        updateCartQuantity(
                                            item.cartItemID,
                                            item.quantity - 1
                                        )
                                    }
                                >
                                    -
                                </button>
                                <p>{item.quantity}</p>
                                <button
                                    onClick={() =>
                                        updateCartQuantity(
                                            item.cartItemID,
                                            item.quantity + 1
                                        )
                                    }
                                >
                                    +
                                </button>

                                <RiDeleteBin6Line
                                    onClick={() =>
                                        handleRemoveItem(item.cartItemID)
                                    }
                                    size={20}
                                />
                            </div>
                        </div>
                        <div
                            style={{ fontWeight: "800" }}
                            className="classIem-format-main-total"
                        >
                            {(
                                cartItemTotals[item.cartItemID] ||
                                (item.price * item.quantity * 25).toFixed(2)
                            ).toLocaleString()}
                            đ
                        </div>
                    </div>
                ))
            )}

            <div className="classIem-format-main-bottom-right">
                <div className="classIem-format-main-bottom-right-sub-pos">
                    <div className="classIem-format-main-bottom-right-sub">
                        <p>Subtotal</p>
                        <p style={{ fontWeight: "800", color: "red" }}>
                            {cartTotalAmount.toLocaleString()}đ
                        </p>
                    </div>
                    <Link style={{ textDecoration: "none" }} to="/payment">
                        <div className="classIem-format-main-bottom-right-sub-btn">
                            Check out
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
