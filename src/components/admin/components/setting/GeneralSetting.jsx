import React from "react";
import { Form, Input, Switch, Button, Divider } from "antd";

const GeneralSetting = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        //** Logic here */
    };

    return (
        <div className="w-full !p-8 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="!mb-6 text-2xl font-bold">Cài Đặt Chung</h2>

            <section className="mb-8">
                <h4 className="!mb-4 text-lg font-semibold">
                    Thông Tin Tài Khoản
                </h4>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        tenDangNhap: "nguyen_van_a",
                        email: "nguyenvana@example.com",
                    }}
                >
                    <Form.Item
                        label="Tên Đăng Nhập"
                        name="tenDangNhap"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên đăng nhập",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên đăng nhập" />
                    </Form.Item>

                    <Form.Item
                        label="Địa Chỉ Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập địa chỉ email",
                            },
                            {
                                type: "email",
                                message: "Vui lòng nhập địa chỉ email hợp lệ",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập địa chỉ email" />
                    </Form.Item>
                </Form>
            </section>

            <Divider />

            {/* Phần Tùy Chọn */}
            <section className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Tùy Chọn</h3>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        thongBaoEmail: true,
                    }}
                >
                    <Form.Item
                        label="Nhận Thông Báo Qua Email"
                        name="thongBaoEmail"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </section>

            <Divider />

            {/* Phần Bảo Mật */}
            <section className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Bảo Mật</h3>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Mật Khẩu Hiện Tại"
                        name="matKhauHienTai"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu hiện tại",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                    </Form.Item>

                    <Form.Item
                        label="Mật Khẩu Mới"
                        name="matKhauMoi"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu mới",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>

                    <Form.Item
                        label="Xác Nhận Mật Khẩu Mới"
                        name="xacNhanMatKhauMoi"
                        dependencies={["matKhauMoi"]}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng xác nhận mật khẩu mới",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("matKhauMoi") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "Mật khẩu xác nhận không khớp!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Xác nhận mật khẩu mới" />
                    </Form.Item>
                </Form>
            </section>

            <Divider />

            {/* Nút Lưu Thay Đổi */}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Lưu Thay Đổi
                </Button>
            </Form.Item>
        </div>
    );
};

export default GeneralSetting;
