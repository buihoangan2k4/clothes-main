import React, { useContext, useState, useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import "./Navbar.css";
import categoryService from "../../services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { Flex, Input, Menu, Spin } from "antd";
import { axiosConfig } from "../utils/apiFunction";
import { parseApiData } from "../../utils/apiData";

export const Navbar = () => {
    const { searchQuery, handleSearch, userId, addCart, isLoggedIn, userName } =
        useContext(ShopContext);

    const [cart, setCart] = useState(""); // Quản lý menu đang chọn

    const { data: categories, isLoading } = useQuery({
        queryKey: ["/categories/all"],
        queryFn: () => categoryService.getCategories(),
        select: (data) => {
            return parseApiData(data, []);
        },
    });

    useEffect(() => {
        const cartTotl = async () => {
            if (!userId) {
                setCart("");
                return;
            }

            try {
                const response = await axiosConfig.get(
                    `/cart/cart-items/${userId}/quantities`
                );
                setCart(parseApiData(response.data, 0));
            } catch (error) {
                console.error("Error fetching cart quantity:", error);
                setCart("");
            }
        };
        cartTotl();
    }, [addCart, userId]);

    return (
        <Flex vertical>
            <div className="nav">
                <div className="nav-lerf">
                    <ul className="nav-menu">
                        {isLoading ? (
                            <Spin />
                        ) : (
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={["whatever"]}
                            >
                                <Menu.Item key="whatever">
                                    <Link to={`/`}>Whatever</Link>
                                </Menu.Item>
                                <Menu.Item key="shop">
                                    <Link to={`/shop`}>Shop</Link>
                                </Menu.Item>
                                <Menu.Item key="support">
                                    <Link to={`/support`}>Support</Link>
                                </Menu.Item>

                                {categories?.map((category) => (
                                    <Menu.Item key={category.categoryId}>
                                        <Link
                                            to={`/category?p=${category.categoryId}`}
                                        >
                                            {category.categoriesName}
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </Menu>
                        )}
                    </ul>
                </div>

                <div className="nav-right">
                    <Input.Search
                        size="large"
                        placeholder="Tìm kiếm sản phẩm"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <div className="nav-right-login-cart">
                        {isLoggedIn ? (
                            <span className="nav-username">{userName}</span>
                        ) : (
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={"/registerSingin"}
                            >
                                <FaRegUser fontSize="25px" />
                            </Link>
                        )}
                        <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={"/cart"}
                        >
                            <MdOutlineShoppingCart size="30px" />
                        </Link>
                        <div className="nav-cart-accourt">{cart}</div>
                    </div>
                </div>
            </div>
        </Flex>
    );
};
