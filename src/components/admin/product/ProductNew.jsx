import React, { useState } from "react";
import {
    Form,
    Input,
    InputNumber,
    Button,
    message,
    Row,
    Col,
    Divider,
    Typography,
    Select,
    Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import productService from "../../../services/productService";
import { BiTrash } from "react-icons/bi";
import categoryService from "../../../services/categoryService";
import { getBase64 } from "../../../utils";
import { parseApiData } from "../../../utils/apiData";

const ProductNew = () => {
    const [fileList, setFileList] = useState([]);
    const [base64Image, setBase64Image] = useState("");

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { data: categories } = useQuery({
        queryKey: ["/categories/all"],
        queryFn: categoryService.getCategories,
        select: (data) => {
            return parseApiData(data, []);
        },
    });

    const onFinish = async (values) => {
        try {
            await productService.createProduct({
                ...values,
                images: [
                    {
                        productImage: base64Image,
                        isPrimary: true,
                    },
                ],
            });
            message.success("Tạo sản phẩm thành công");
            navigate(`/admin/products`);
        } catch (error) {
            message.error("Tạo sản phẩm thất bại");
        }
    };

    const beforeUpload = async (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("Bạn chỉ có thể upload được hình ảnh!");
            return Upload.LIST_IGNORE;
        }

        const base64 = await getBase64(file);
        setBase64Image(base64);

        const newFile = {
            ...file,
            thumbUrl: base64,
        };

        setFileList([newFile]);
        return false;
    };

    const handleRemove = () => {
        setFileList([]);
        setBase64Image("");
    };

    return (
        <>
            <Typography.Title level={3}>Tạo sản phẩm mới</Typography.Title>
            <div className="w-full !p-4 my-8 bg-white rounded-lg shadow-md">
                <Divider>Thông tin chung</Divider>

                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên sản phẩm"
                                name="productsName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tên sản phẩm",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên sản phẩm" />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item
                                label="Giá"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập giá sản phẩm",
                                    },
                                ]}
                            >
                                <InputNumber
                                    type="number"
                                    className="w-full"
                                    formatter={(value) => `${value}$`}
                                    parser={(value) =>
                                        value.replace(/\đ\s?|(,*)/g, "")
                                    }
                                    placeholder="Nhập giá sản phẩm"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item
                                label="Hình ảnh sản phẩm"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập giá sản phẩm",
                                    },
                                ]}
                            >
                                <Upload
                                    accept="image/*"
                                    listType="picture-card"
                                    fileList={fileList}
                                    beforeUpload={beforeUpload}
                                    onRemove={handleRemove}
                                    showUploadList={{ showPreviewIcon: false }}
                                >
                                    {fileList.length >= 1 ? null : (
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>
                                                Upload
                                            </div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập mô tả sản phẩm",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Nhập mô tả sản phẩm"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Mã danh mục"
                                name="categoryID"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập mã danh mục",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn mã danh mục"
                                    options={categories?.map((category) => ({
                                        label: category.categoriesName,
                                        value: category.categoryId,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider>Biến thể</Divider>
                    <Form.List name="variants">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row gutter={16} key={key} align="middle">
                                        <Col span={10}>
                                            <Form.Item
                                                {...restField}
                                                label="Kích cỡ"
                                                name={[name, "size"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Vui lòng nhập kích cỡ",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Nhập kích cỡ" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Form.Item
                                                {...restField}
                                                label="Số lượng tồn kho"
                                                name={[name, "stockQuantity"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Vui lòng nhập số lượng tồn kho",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    style={{ width: "100%" }}
                                                    min={0}
                                                    className="w-full"
                                                    placeholder="Nhập số lượng tồn kho"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                            <Button
                                                type="text"
                                                danger
                                                icon={<BiTrash size={16} />}
                                                onClick={() => remove(name)}
                                            />
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm biến thể
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Tạo sản phẩm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default ProductNew;
