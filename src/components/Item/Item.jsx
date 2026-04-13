import React, { useState, useEffect } from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (prop) => {
    return (
        <div className="item">
            <Link to={`/product/${prop.id}`}>
                <img
                    style={{
                        width: "250px",
                        height: "200px",
                        objectFit: "top",
                    }}
                    src={prop.image || `/public/images/products/men1.png`}
                    alt=""
                />
            </Link>
            <p>{prop.name}</p>
            <div className="item-prices">
                <div className="item-prices-old">
                    <p>${prop.new_price}</p>
                </div>
                <div className="item-prices-new">
                    <p style={{ fontWeight: "600", color: "#ff0000" }}>
                        ${prop.new_price * 0.25}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Item;
