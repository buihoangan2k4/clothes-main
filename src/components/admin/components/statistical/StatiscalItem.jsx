import { Card, Flex, Tag, Typography } from "antd";
import { BsArrow90DegUp } from "react-icons/bs";

const StatisticalItem = (props) => {
    const { backgroundColor, title, percent, value, icon } = props;

    const { Text } = Typography;
    return (
        <Card
            className="statistical-item"
            style={{
                background: `${backgroundColor}`,
            }}
        >
            <Flex vertical gap={8}>
                <div className="statistical-item__icon">{icon}</div>
                <Text className="statistical-item__title">{title}</Text>
                <Flex gap={8} align="center">
                    <Text className="statistical-item__value">{value}</Text>
                    <Tag color="white">
                        <Flex gap={6} align="center">
                            <BsArrow90DegUp
                                icon="bxs:up-arrow"
                                color="#3CD856"
                                width={12}
                            />
                            <Text className="statistical-item__percent">
                                {percent}
                            </Text>
                        </Flex>
                    </Tag>
                </Flex>
            </Flex>
        </Card>
    );
};

export { StatisticalItem };
