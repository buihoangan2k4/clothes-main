import { axiosConfig } from "../components/utils/apiFunction";

class OrderService {
    async getOrders(status = "") {
        const params = {};
        if (status) {
            params.orderStatus = status;
        }
        const response = await axiosConfig.get("/orders/", { params });
        return response.data;
    }

    async getOrderById(userId, id) {
        const response = await axiosConfig.get(
            `/orders/${userId}/order-detail`,
            {
                params: { orderId: id },
            }
        );
        return response.data;
    }

    async createOrder(order) {
        const response = await axiosConfig.post("/orders", order);
        return response.data;
    }
}
const orderService = new OrderService();

export default orderService;
