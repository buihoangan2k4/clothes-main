import React from "react";
import {
    Descriptions,
    Card,
    Tag,
    Typography,
    Divider,
    Flex,
} from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import orderService from "../../../services/orderService";
import { useQuery } from "@tanstack/react-query";
import productService from "../../../services/productService";
import { parseApiData } from "../../../utils/apiData";

const OrderDetail = () => {
    const { orderId } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["/orders-detail", orderId],
        queryFn: () => orderService.getOrderById(1, orderId),
        enabled: !!orderId,
        select: (data) => {
            return parseApiData(data);
        },
    });

    const { data: products } = useQuery({
        queryKey: ["/products/available"],
        queryFn: productService.getProducts,
        select: (data) => {
            return parseApiData(data, []);
        },
    });

    const statusTag = (status) => {
        switch (status) {
            case "PENDING":
                return <Tag color="orange">Chờ xử lý</Tag>;
            case "PROCESSING":
                return <Tag color="cyan">Đang xử lý</Tag>;
            case "COMPLETED":
                return <Tag color="green">Hoàn tất</Tag>;
            case "CANCELLED":
                return <Tag color="red">Đã hủy</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    const paymentStatusTag = (status) => {
        return (
            <Tag color={status === "PAID" ? "green" : "red"}>
                {status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}
            </Tag>
        );
    };

    return (
        <Card title={`Chi tiết đơn hàng #${data?.orderId}`} loading={isLoading}>
            <Descriptions
                layout="vertical"
                column={2}
                labelStyle={{ fontWeight: "bold" }}
            >
                <Descriptions.Item label="Trạng thái đơn hàng">
                    {statusTag(data?.orderStatus)}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái thanh toán">
                    {paymentStatusTag(data?.paymentStatus)}
                </Descriptions.Item>
                <Descriptions.Item label="Phương thức thanh toán">
                    {data?.paymentMethod}
                </Descriptions.Item>
                <Descriptions.Item label="Mã giao dịch">
                    {data?.transactionCode || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng tiền">
                    ${data?.totalAmount.toFixed(2)}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày đặt hàng">
                    {dayjs(data?.createAt).format("DD/MM/YYYY HH:mm")}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày thanh toán">
                    {data?.paymentDate
                        ? dayjs(data?.paymentDate).format("DD/MM/YYYY HH:mm")
                        : "Chưa thanh toán"}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ giao hàng">
                    {data?.shippingAddress}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ thanh toán">
                    {data?.billingAddress}
                </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Typography.Title level={5}>Sản phẩm</Typography.Title>
            {data?.products?.map((product) => (
                <Card
                    key={product?.productId}
                    type="inner"
                    title={product?.productsName}
                    style={{ marginBottom: 16 }}
                >
                    <Flex gap={16}>
                        <img
                            src={
                                products?.find(
                                    (item) =>
                                        product.productId === item.productId
                                )?.images[0]?.productImage
                            }
                            alt={product?.productsName}
                            style={{
                                borderRadius: 8,
                                objectFit: "cover",
                                display: "block",
                                width: "200px",
                                height: "250px",
                            }}
                        />
                        <Descriptions column={1}>
                            <Descriptions.Item label="Danh mục">
                                {product?.categoryName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Giá">
                                ${product?.price.toFixed(2)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Mô tả">
                                {product?.description}
                            </Descriptions.Item>
                            <Descriptions.Item label="Size & Tồn kho">
                                {product?.variants
                                    .map(
                                        (v) =>
                                            `${v.size} - SL: ${v.stockQuantity}`
                                    )
                                    .join(", ")}
                            </Descriptions.Item>
                        </Descriptions>
                    </Flex>
                </Card>
            ))}
        </Card>
    );
};

export default OrderDetail;
