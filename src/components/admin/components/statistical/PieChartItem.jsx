import React from "react";
import { Line } from "@ant-design/charts";

const PieChartItem = () => {
    const data = [
        { year: "2020", value: Math.floor(Math.random() * 100) },
        { year: "2021", value: Math.floor(Math.random() * 100) },
        { year: "2022", value: Math.floor(Math.random() * 100) },
        { year: "2023", value: Math.floor(Math.random() * 100) },
        { year: "2024", value: Math.floor(Math.random() * 100) },
        { year: "2025", value: Math.floor(Math.random() * 100) },
        { year: "2026", value: Math.floor(Math.random() * 100) },
        { year: "2027", value: Math.floor(Math.random() * 100) },
        { year: "2028", value: Math.floor(Math.random() * 100) },
    ];

    const config = {
        data,
        xField: "year",
        yField: "value",
    };

    return (
        <div
            style={{
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
                boxShadow: "0 2px 4px 0 rgba(0,0,0,.05)",
            }}
        >
            <Line {...config} />
        </div>
    );
};
export default PieChartItem;
