import { Col, DatePicker, Flex, Radio, Row, Typography } from "antd";
import "./components/statistical/dashboard.css";
import { StatisticalItem } from "./components/statistical/StatiscalItem";
import ChartItem from "./components/statistical/ChartItem";
import { statisticalData } from "./components/statistical/data";
import PieChartItem from "./components/statistical/PieChartItem";
const AdminDashboard = () => {
    const { Title, Text } = Typography;

    const options = [
        { label: "Hôm nay", value: "today" },
        { label: "Tuần qua", value: "last week" },
        { label: "Tháng này", value: "this month" },
    ];

    const sampleData = [
        { year: "2022", value: 100, up: true },
        { year: "2023", value: 80, down: true },
        { year: "2024", value: 120, up: true },
        { year: "2025", value: 90, down: true },
        { year: "2026", value: 110, up: true },
        { year: "2027", value: 85, down: true },
        { year: "2028", value: 105, up: true },
        { year: "2029", value: 95, down: true },
        { year: "2030", value: 100, up: true },
    ];

    const sampleDataOne = [
        { type: "Thịt trâu", value: 27 },
        { type: "Thịt đỏ", value: 25 },
        { type: "Thịt mỏ", value: 20 },
        { type: "Thịt nổi", value: 15 },
        { type: "Thịt sốt", value: 10 },
        { type: "Thịt hạ", value: 5 },
        { type: "Thịt mới", value: 0 },
    ];

    return (
        <Flex vertical className="dashboard-page" gap={16}>
            <Flex
                vertical
                style={{
                    padding: "4px",
                    background: "#ffffff",
                    borderRadius: "4px",
                }}
            >
                <Title level={5}> Tổng quan</Title>
                <Flex
                    justify="space-between"
                    align="center"
                    className="dashboard-page__heading"
                    style={{ marginBottom: "12px" }}
                >
                    <Radio.Group
                        className="radio-group"
                        block
                        style={{
                            width: "20%",
                        }}
                        options={options}
                        defaultValue="today"
                        optionType="button"
                        buttonStyle="solid"
                        onChange={() => {}}
                        size="small"
                    />
                    <Flex gap={16} align="center">
                        <Text>Thời gian cụ thể</Text>
                        <DatePicker
                            picker="date"
                            name="date"
                            placeholder="Vui lòng chọn"
                        />
                    </Flex>
                </Flex>

                <Flex vertical gap={16}>
                    <Row gutter={[16, 16]}>
                        {statisticalData.map((item, index) => (
                            <Col key={index} lg={6} md={8} sm={12} xs={24}>
                                <StatisticalItem
                                    backgroundColor={item.backgroundColor}
                                    icon={item.icon}
                                    title={item.title}
                                    value={item.value}
                                    percent={item.percent}
                                />
                            </Col>
                        ))}
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col lg={12} md={24} sm={24} xs={24}>
                            <ChartItem
                                data={sampleData}
                                height={500}
                                pointShape="circle"
                                tooltipPosition="left"
                                showMarkers={true}
                                showTooltipContent={true}
                                showCrosshairs={false}
                            />
                        </Col>
                        <Col lg={12} md={24} sm={24} xs={24}>
                            <PieChartItem
                                data={sampleDataOne}
                                height={500}
                                innerRadius={0.7}
                                // legendPosition="bottom"
                                colors={[
                                    "#f5222d",
                                    "#faad14",
                                    "#52c41a",
                                    "#1890ff",
                                    "#722ed1",
                                ]}
                            />
                        </Col>
                    </Row>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default AdminDashboard;
