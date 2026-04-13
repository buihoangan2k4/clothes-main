package com.clotheshop.service;

import com.clotheshop.dto.OrderDtos;
import com.clotheshop.entity.Order;
import com.clotheshop.entity.OrderStatus;

import java.util.List;

public interface OrderService {
    List<Order> getOrders(OrderStatus status);
    Order getOrderDetail(Long userId, Long orderId);
    Order createOrder(OrderDtos.CreateOrderRequest request);
}
