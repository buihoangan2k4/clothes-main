import React, { useState } from "react";
import {
    Button,
    Flex,
    Image,
    Input,
    message,
    Modal,
    Table,
    Tag,
    Tooltip,
    Typography,
} from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import productService from "../../../services/productService";
import { Link, useNavigate } from "react-router-dom";
import { BiPencil, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { parseApiData } from "../../../utils/apiData";

const ProductList = () => {
    const [search, setSearch] = useState("");
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["/products/available", search],
        queryFn: () => productService.getProductsAdmin(search),
        select: (data) => parseApiData(data, []),
    });

    const { mutate: deleteProduct } = useMutation({
        mutationFn: (id) => productService.deleteProduct(id),
        onSuccess: () => {
            message.success("Xoá sản phẩm thành công!");
            refetch();
        },
    });

    const handleDeleteProduct = (id) => {
        Modal.confirm({
            title: "Bạn có chắc muốn xoá sản phẩm này?",
            content: "Hành động này không thể được hoàn tác",
            okText: "Có",
            okType: "danger",
            cancelText: "Huỷ",
            onOk() {
                deleteProduct(id);
            },
        });
    };

    const navigate = useNavigate();
    const columns = [
        {
            title: "Hình ảnh",
            dataIndex: "images",
            key: "images",
            render: (images) => {
                const primaryImage = images?.[0];
                return primaryImage ? (
                    <Image
                        src={`${primaryImage?.productImage}`}
                        alt="Product"
                        style={{ width: 50 }}
                    />
                ) : null;
            },
        },

        {
            title: "Tên sản phẩm",
            dataIndex: "productsName",
            key: "productsName",
            render: (name, record) => (
                <Link to={`/admin/products/${record.productId}`}>{name}</Link>
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price) => `${price.toFixed(2)}đ`,
        },
        {
            title: "Danh mục",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "Số lượng",
            dataIndex: "stockQuantity",
            key: "stockQuantity",
        },
        {
            title: "Trạng thái sản phẩm",
            dataIndex: "productStatus",
            key: "productStatus",
            render: (status) => {
                let color = "";
                let text = "";
                switch (status) {
                    case "AVAILABLE":
                        color = "green";
                        text = "Còn hàng";
                        break;
                    case "SOLD":
                        color = "volcano";
                        text = "Đã bán";
                        break;
                    case "DELETED":
                        color = "red";
                        text = "Đã xoá";
                        break;
                    default:
                        break;
                }
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Biến thể",
            dataIndex: "variants",
            key: "variants",
            render: (variants) =>
                variants.map((variant) => (
                    <Tag key={variant.variantId}>
                        {variant.size} ({variant.stockQuantity})
                    </Tag>
                )),
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
                                navigate(`/admin/products/${record.productId}`)
                            }
                            size={16}
                            className="text-green-500 cursor-pointer hover:text-green-600"
                        />
                    </Tooltip>
                    <Tooltip title="Sửa sản phẩm">
                        <BiPencil
                            onClick={() =>
                                navigate(
                                    `/admin/products/${record.productId}/edit`
                                )
                            }
                            size={16}
                            className="text-blue-500 cursor-pointer hover:text-blue-600"
                        />
                    </Tooltip>
                    <Tooltip title="Xoá sản phẩm">
                        <BiTrash
                            onClick={() =>
                                handleDeleteProduct(record.productId)
                            }
                            size={16}
                            className="text-red-500 cursor-pointer hover:text-red-600"
                        />
                    </Tooltip>
                </Flex>
            ),
        },
    ];

    return (
        <Flex vertical className="product-list">
            <Flex
                justify="space-between"
                align="center"
                style={{
                    marginBottom: 16,
                }}
            >
                <Typography.Title level={5}>
                    {" "}
                    Danh sách sản phẩm{" "}
                </Typography.Title>
                <Flex gap={4}>
                    <Input.Search
                        placeholder="Nhập tên sản phẩm"
                        style={{ width: 300 }}
                        onSearch={(value) => setSearch(value)}
                        enterButton
                    />
                    <Button
                        type="primary"
                        onClick={() => navigate("/admin/products/new")}
                    >
                        Tạo sản phẩm
                    </Button>
                </Flex>
            </Flex>
            <Table
                bordered
                loading={isLoading}
                dataSource={data || []}
                columns={columns}
                rowKey="productId"
                pagination={{ pageSize: 5 }}
            />
        </Flex>
    );
};

export default ProductList;
