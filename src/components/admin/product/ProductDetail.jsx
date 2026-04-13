import React from "react";
import { Card, Tag } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import productService from "../../../services/productService";
import { parseApiData } from "../../../utils/apiData";

const ProductDetail = () => {
    const { productId } = useParams();

    const { data: product, isLoading } = useQuery({
        queryKey: ["/products/detail", productId],
        queryFn: () => productService.getProductById(productId),
        enabled: !!productId,
        select: (data) => {
            return parseApiData(data);
        },
    });

    const primaryImage = product?.images[0];

    return (
        <div className="mx-auto my-8 ">
            <Card
                hoverable
                loading={isLoading}
                className="rounded-lg shadow-lg"
                cover={
                    <img
                        alt={product?.productsName}
                        src={
                            primaryImage
                                ? `${primaryImage.productImage}`
                                : "/images/products/men1.png"
                        }
                        className="object-contain w-full rounded-t-lg h-96"
                    />
                }
            >
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {product?.productsName}
                    </h2>
                    <p className="mt-2 text-gray-600">{product?.description}</p>
                    <div className="mt-4">
                        <span className="text-xl font-semibold text-indigo-600">
                            ${product?.price?.toFixed(2)}
                        </span>
                    </div>
                    <div className="mt-2">
                        <span className="text-gray-700">Kho: </span>
                        <span className="font-medium">
                            {product?.stockQuantity}
                        </span>
                    </div>
                    <div className="mt-2">
                        <span className="text-gray-700">Trạng thái: </span>
                        <Tag
                            color={
                                product?.productStatus === "AVAILABLE"
                                    ? "green"
                                    : "red"
                            }
                        >
                            {product?.productStatus}
                        </Tag>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Biến thể:
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {product?.variants?.map((variant) => (
                                <Tag key={variant.variantId} color="blue">
                                    {variant.size} ({variant.stockQuantity})
                                </Tag>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProductDetail;
