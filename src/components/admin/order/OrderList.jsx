import React, { useState } from "react";
import {
    Table,
    Tag,
    Typography,
    Flex,
    Tooltip,
    Select,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import orderService from "../../../services/orderService";
import { Link, useNavigate } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { parseApiData } from "../../../utils/apiData";

const OrderList = () => {
    const [status, setStatus] = useState("");
    const { data, isLoading } = useQuery({
        queryKey: ["/orders-list", status],
        queryFn: () => orderService.getOrders(status),
        select: (data) => {
            return parseApiData(data, []);
        },
    });

    const navigate = useNavigate();

    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "orderId",
            key: "orderId",
            render: (orderId) => (
                <Link to={`/admin/orders/${orderId}`}>{orderId}</Link>
            ),
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (amount) => `$${amount.toFixed(2)}`,
        },
        {
            title: "Trạng thái đơn hàng",
            dataIndex: "orderStatus",
            key: "orderStatus",
            render: (status) => {
                let color = "blue";
                let text = "";
                switch (status) {
                    case "PENDING":
                        color = "orange";
                        text = "Chờ xử lý";
                        break;
                    case "PROCESSING":
                        color = "cyan";
                        text = "Đang xử lý";
                        break;
                    case "COMPLETED":
                        color = "green";
                        text = "Đã hoàn thành";
                        break;
                    case "CANCELLED":
                        color = "red";
                        text = "Đã huỷ";
                        break;
                    case "DELIVERED":
                        color = "green";
                        text = "Đã được gửi";
                        break;
                    default:
                        text = status;
                }
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Trạng thái thanh toán",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (status) => {
                const color = status === "PAID" ? "green" : "red";
                const text =
                    status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán";
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createAt",
            key: "createAt",
        },
        {
            title: "Địa chỉ giao hàng",
            dataIndex: "shippingAddress",
            key: "shippingAddress",
        },
        {
            title: "Địa chỉ thanh toán",
            dataIndex: "billingAddress",
            key: "billingAddress",
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <Flex gap={4}>
                    <Tooltip title="Xem chi tiết">
                        <BsEye
                            onClick={() =>
                                navigate(`/admin/orders/${record.orderId}`)
                            }
                            size={16}
                            className="text-green-500 cursor-pointer hover:text-green-600"
                        />
                    </Tooltip>

                    <Tooltip title="Xoá đơn hàng">
                        <BiTrash
                            // onClick={() => handleDeleteOrder(record.orderId)}
                            size={16}
                            className="text-red-500 cursor-pointer hover:text-red-600"
                        />
                    </Tooltip>
                </Flex>
            ),
        },
    ];

    return (
        <Flex vertical>
            <Flex
                justify="space-between"
                align="center"
                style={{ marginBottom: 16 }}
            >
                <Typography.Title level={5}>
                    Danh sách đơn hàng
                </Typography.Title>

                <Flex gap={10} align="center">
                    <Typography.Text>Trạng thái đơn hàng</Typography.Text>
                    <Select
                        defaultValue=""
                        style={{ width: 150 }}
                        onChange={(value) => {
                            setStatus(value);
                        }}
                    >
                        <Select.Option value="">Tất cả</Select.Option>
                        <Select.Option value="PENDING">Chờ xử lý</Select.Option>
                        <Select.Option value="PROCESSING">
                            Đang xử lý
                        </Select.Option>
                        <Select.Option value="COMPLETED">
                            {" "}
                            Hoàn tất
                        </Select.Option>
                        <Select.Option value="CANCELLED"> Đã hủy</Select.Option>
                        <Select.Option value="DELIVERED">
                            Đã được gửi
                        </Select.Option>
                    </Select>
                </Flex>
            </Flex>
            <Table
                loading={isLoading}
                rowKey="orderId"
                dataSource={data ? data : []}
                columns={columns}
                bordered
                pagination={{ pageSize: 5 }}
            />
        </Flex>
    );
};

export default OrderList;
