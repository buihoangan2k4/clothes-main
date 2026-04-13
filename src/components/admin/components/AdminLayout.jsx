import React, { useContext, useState } from "react";
import { Layout, Menu, Dropdown, Flex, message } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    DownOutlined,
    ProductOutlined,
    OrderedListOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { ShopContext } from "../../context/ShopContext";

const { Header, Sider, Content, Footer } = Layout;

const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => setCollapsed(!collapsed);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate("/loginSingup");

        message.success("Đã đăng xuất");
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="profile">
                <div
                    onClick={() =>
                        message.info("Chức năng đang được phát triển")
                    }
                >
                    Thông tin cá nhân
                </div>
            </Menu.Item>
            <Menu.Item key="logout">
                <div onClick={handleLogout}>Đăng xuất</div>
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout className="min-h-screen">
            {/* SIDEBAR */}
            <Sider
                collapsible
                theme="light"
                collapsed={collapsed}
                onCollapse={toggleCollapsed}
                width={240}
                className="transition-all duration-300 bg-[] border-r border-gray-100 shadow-md"
            >
                <div className="flex items-center justify-center h-12 border-b border-gray-100 bg-gradient-to-r from-blue-100 to-blue-50">
                    <span className="text-xl font-bold text-gray-800">
                        {collapsed ? "Admin" : "Admin Dashboard"}
                    </span>
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["dashboard"]}
                    theme="light"
                    style={{ height: "100%" }}
                    className="!pt-4 mt-3 text-base"
                >
                    <Menu.Item key="dashboard" icon={<LaptopOutlined />}>
                        <Link to="/admin">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="users" icon={<UserOutlined />}>
                        <Link to="/admin/users">Quản lý người dùng</Link>
                    </Menu.Item>
                    <Menu.Item key="settings" icon={<SettingOutlined />}>
                        <Link to="/admin/settings">Thiết lập chung</Link>
                    </Menu.Item>
                    <Menu.Item key="products" icon={<ProductOutlined />}>
                        <Link to="/admin/products">Quản lý sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key="orders" icon={<OrderedListOutlined />}>
                        <Link to="/admin/orders">Quản lý đơn hàng</Link>
                    </Menu.Item>
                    <Menu.Item key="event" icon={<NotificationOutlined />}>
                        <Link to="/admin/events">Quản lý sự kiện</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                {/* HEADER */}
                <Header className="flex items-center justify-between px-4 border-b border-gray-100 !bg-gradient-to-r from-blue-100 to-blue-50 shadow-sm !h-12">
                    <div className="flex items-center">
                        <h1 className="ml-4 text-lg font-semibold text-gray-700">
                            Quản lý hệ thống
                        </h1>
                    </div>
                    <div>
                        <Dropdown
                            overlay={userMenu}
                            trigger={["click"]}
                            placement="bottomRight"
                        >
                            <div className="flex items-center gap-4 text-gray-600 cursor-pointer hover:text-blue-600">
                                <UserOutlined className="mr-1" />
                                <Flex gap={2}>
                                    <span className="font-medium">
                                        Admin User
                                    </span>
                                    <DownOutlined className="ml-1 text-xs" />
                                </Flex>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content className="flex-1 p-6 bg-gray-50 h-[calc(100vh-120px)] overflow-y-scroll overflow-x-hidden">
                    <div className="bg-white rounded shadow !p-4">
                        {children ? children : <Outlet />}
                    </div>
                </Content>
                {/* FOOTER */}
                <Footer className="py-4 text-center !bg-gray-50 border-t border-gray-100">
                    <div className="text-gray-500">
                        © {new Date().getFullYear()} Admin Panel. All Rights
                        Reserved.
                    </div>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
