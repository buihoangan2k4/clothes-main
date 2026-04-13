import React from "react";
import { useParams } from "react-router-dom";
import ProductDisplay from "../productDisplay/ProductDisplay";
import { useQuery } from "@tanstack/react-query";
import productService from "../../services/productService";
import { Empty, Spin } from "antd";
import { parseApiData } from "../../utils/apiData";

export const Product = () => {
    const { productId } = useParams();

    const { data, isLoading } = useQuery({
        queryFn: () => productService.getProductById(productId),
        queryKey: ["/products/detail", productId],
        select: (data) => {
            return parseApiData(data);
        },
        enabled: !!productId,
    });

    return (
        <div className="product">
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Spin />
                </div>
            ) : data ? (
                <ProductDisplay product={data} />
            ) : (
                <Empty description="Không tìm thấy sản phẩm" />
            )}
        </div>
    );
};
