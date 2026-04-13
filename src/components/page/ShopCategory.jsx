import React, { useEffect, useState } from "react";
import "./Css/ShopCategory.css";
import Item from "../Item/Item";
import SalesBanner from "./SalesBanner "; // Import the SalesBanner component
import { axiosConfig } from "../utils/apiFunction";
import { parseApiData } from "../../utils/apiData";

export const ShopCategory = (props) => {
    const [getMenuCategory, setGetMenuCategory] = useState([]);

    useEffect(() => {
        const fetchJsongetMenuCategory = async () => {
            try {
                const response = await axiosConfig.get("/products/available", {
                    params: { page: 1, pageSize: 10 },
                });
                const JsongetMenuCategory = parseApiData(response.data, []);

                setGetMenuCategory(JsongetMenuCategory); // Cập nhật state
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchJsongetMenuCategory();
    }, []);

    return (
        <div className="ShopCategory">
            {/* Replace the static image with our dynamic SalesBanner component */}
            <SalesBanner />

            <div className="ShopCategory-products">
                {getMenuCategory.map((item, i) => {
                    if (item.description === props.description) {
                        return (
                            <Item
                                key={i}
                                id={item.productId}
                                name={item.productsName}
                                image={`/${item.images[0].imageUrl}`}
                                new_price={item.price}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
};

export default ShopCategory;
