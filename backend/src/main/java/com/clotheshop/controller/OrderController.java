package com.clotheshop.controller;

import com.clotheshop.dto.ApiResponse;
import com.clotheshop.dto.OrderDtos;
import com.clotheshop.entity.Order;
import com.clotheshop.entity.OrderStatus;
import com.clotheshop.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping({"", "/"})
    public ApiResponse<List<Order>> list(@RequestParam(name = "orderStatus", required = false) String orderStatus) {
        OrderStatus status = (orderStatus == null || orderStatus.isBlank()) ? null : OrderStatus.valueOf(orderStatus);
        return new ApiResponse<>("OK", orderService.getOrders(status));
    }

    @GetMapping("/{userId}/order-detail")
    public ApiResponse<Order> detail(@PathVariable Long userId, @RequestParam Long orderId) {
        return new ApiResponse<>("OK", orderService.getOrderDetail(userId, orderId));
    }

    @PostMapping({"", "/"})
    public ApiResponse<Order> create(@Valid @RequestBody OrderDtos.CreateOrderRequest request) {
        return new ApiResponse<>("Created", orderService.createOrder(request));
    }

    @PostMapping("/{userId}/create-order")
    public ApiResponse<Order> createByPath(@PathVariable Long userId, @Valid @RequestBody OrderDtos.CreateOrderRequest request) {
        request.setUserId(userId);
        return new ApiResponse<>("Created", orderService.createOrder(request));
    }
}
