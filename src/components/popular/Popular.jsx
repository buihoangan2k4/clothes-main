import React from "react";
import Item from "../Item/Item";
import "./Popular.css";
import { useQuery } from "@tanstack/react-query";
import productService from "../../services/productService";
import { Spin } from "antd";
import { parseApiData } from "../../utils/apiData";
const Popular = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["/products/available"],
        queryFn: productService.getProducts,
        select: (data) => parseApiData(data, []),
    });

    return (
        <>
            {isLoading ? (
                <Spin />
            ) : (
                <div className="popular">
                    <div className="popular-item">
                        {data
                            ? data?.map((item, i) => (
                                  <Item
                                      key={i}
                                      id={item.productId}
                                      categoryName={item.categoryName}
                                      stockQuantity={item.stockQuantity}
                                      name={item.productsName}
                                      variant={
                                          item.variants?.[4]?.size || "N/A"
                                      }
                                      image={`${item.images?.[0]?.productImage}`}
                                      new_price={item.price}
                                  />
                              ))
                            : null}
                    </div>
                </div>
            )}
        </>
    );
};

export default Popular;
