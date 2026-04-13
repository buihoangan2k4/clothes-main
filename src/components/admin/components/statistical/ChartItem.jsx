import React from "react";
import { Line } from "@ant-design/charts";

const ChartItem = ({
    data,
    height = 400,
    pointShape = "diamond",
    tooltipPosition = "right",
    showMarkers = true,
    showTooltipContent = true,
    showCrosshairs = true,
}) => {
    const config = {
        data,
        height,
        xField: "year",
        yField: "value",
        point: {
            size: 5,
            shape: pointShape,
        },
        tooltip: {
            formatter: (datum) => ({
                name: "Value",
                value: datum.value,
            }),
            customContent: (name, data) =>
                data
                    ?.map(
                        (item) =>
                            `<div class="tooltip-chart">
                <span class="tooltip-item-name">${item.name}</span>
                <span class="tooltip-item-value">${item.value}</span>
              </div>`
                    )
                    .join("") || "",
            showMarkers,
            showContent: showTooltipContent,
            position: tooltipPosition,
            showCrosshairs,
        },
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

export default ChartItem;
