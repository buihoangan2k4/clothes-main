import React from "react";
import { Table, Tag } from "antd";

const data = [
    {
        key: "1",
        name: "Hội thảo Công nghệ 2025",
        date: "2025-05-20",
        location: "Hà Nội",
        status: "Sắp diễn ra",
    },
    {
        key: "2",
        name: "Triển lãm AI Quốc tế",
        date: "2025-04-10",
        location: "TP. Hồ Chí Minh",
        status: "Đã kết thúc",
    },
    {
        key: "3",
        name: "Hội nghị Nhà phát triển",
        date: "2025-06-15",
        location: "Đà Nẵng",
        status: "Sắp diễn ra",
    },
    {
        key: "4",
        name: "Sự kiện Khởi nghiệp",
        date: "2025-03-05",
        location: "Cần Thơ",
        status: "Đã kết thúc",
    },
];

const columns = [
    {
        title: "Tên sự kiện",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: "Ngày",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Địa điểm",
        dataIndex: "location",
        key: "location",
        filters: [
            { text: "Hà Nội", value: "Hà Nội" },
            { text: "TP. Hồ Chí Minh", value: "TP. Hồ Chí Minh" },
            { text: "Đà Nẵng", value: "Đà Nẵng" },
            { text: "Cần Thơ", value: "Cần Thơ" },
        ],
        onFilter: (value, record) => record.location.includes(value),
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status) => {
            let color = status === "Sắp diễn ra" ? "green" : "volcano";
            return <Tag color={color}>{status}</Tag>;
        },
        filters: [
            { text: "Sắp diễn ra", value: "Sắp diễn ra" },
            { text: "Đã kết thúc", value: "Đã kết thúc" },
        ],
        onFilter: (value, record) => record.status === value,
    },
];

const EventManagement = () => {
    return (
        <div style={{ padding: 12 }}>
            <h2 style={{ marginBottom: 16, fontSize: 18 }}>Quản lý sự kiện</h2>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                bordered
            />
        </div>
    );
};

export default EventManagement;
