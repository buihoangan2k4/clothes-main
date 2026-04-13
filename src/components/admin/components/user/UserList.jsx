import React from "react";
import { Table, Tag } from "antd";

const users = [
    {
        key: "1",
        name: "Nguyễn Văn A",
        email: "a.nguyen@example.com",
        role: "Quản trị viên",
        status: "Hoạt động",
        createdAt: "2024-12-01",
    },
    {
        key: "2",
        name: "Trần Thị B",
        email: "b.tran@example.com",
        role: "Người dùng",
        status: "Tạm khóa",
        createdAt: "2025-01-15",
    },
    {
        key: "3",
        name: "Lê Văn C",
        email: "c.le@example.com",
        role: "Người dùng",
        status: "Hoạt động",
        createdAt: "2025-02-20",
    },
    {
        key: "4",
        name: "Phạm Thị D",
        email: "d.pham@example.com",
        role: "Quản trị viên",
        status: "Tạm khóa",
        createdAt: "2025-03-10",
    },
];

const columns = [
    {
        title: "Họ tên",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
        title: "Vai trò",
        dataIndex: "role",
        key: "role",
        filters: [
            { text: "Quản trị viên", value: "Quản trị viên" },
            { text: "Người dùng", value: "Người dùng" },
        ],
        onFilter: (value, record) => record.role === value,
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status) => {
            let color = status === "Hoạt động" ? "green" : "volcano";
            return <Tag color={color}>{status}</Tag>;
        },
        filters: [
            { text: "Hoạt động", value: "Hoạt động" },
            { text: "Tạm khóa", value: "Tạm khóa" },
        ],
        onFilter: (value, record) => record.status === value,
    },
    {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
    },
];

const UserList = () => {
    return (
        <div style={{ padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>Danh sách người dùng</h2>
            <Table
                columns={columns}
                dataSource={users}
                pagination={{ pageSize: 5 }}
                bordered
            />
        </div>
    );
};

export default UserList;
