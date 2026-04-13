package com.clotheshop.service.impl;

import com.clotheshop.dto.OrderDtos;
import com.clotheshop.entity.*;
import com.clotheshop.repository.CartItemRepository;
import com.clotheshop.repository.OrderRepository;
import com.clotheshop.repository.UserRepository;
import com.clotheshop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public List<Order> getOrders(OrderStatus status) {
        if (status == null) {
            return orderRepository.findAll();
        }
        return orderRepository.findByOrderStatus(status);
    }

    @Override
    public Order getOrderDetail(Long userId, Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        if (!order.getUser().getUserId().equals(userId)) {
            return order;
        }
        return order;
    }

    @Override
    public Order createOrder(OrderDtos.CreateOrderRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        List<CartItem> cartItems = cartItemRepository.findByUser_UserId(request.getUserId());
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = Order.builder()
                .user(user)
                .createAt(LocalDateTime.now())
                .orderStatus(OrderStatus.PENDING)
                .paymentStatus("CASH".equalsIgnoreCase(request.getPaymentMethod()) ? PaymentStatus.UNPAID : PaymentStatus.PAID)
                .paymentMethod(request.getPaymentMethod())
                .shippingAddress(request.getShippingAddress())
                .billingAddress(request.getBillingAddress())
                .items(new ArrayList<>())
                .build();

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem c : cartItems) {
            OrderItem item = OrderItem.builder()
                    .order(order)
                    .product(c.getProduct())
                    .size(c.getSize())
                    .quantity(c.getQuantity())
                    .price(c.getProduct().getPrice())
                    .build();
            order.getItems().add(item);
            total = total.add(c.getProduct().getPrice().multiply(BigDecimal.valueOf(c.getQuantity())));
        }
        order.setTotalAmount(total);
        if (PaymentStatus.PAID.equals(order.getPaymentStatus())) {
            order.setPaymentDate(LocalDateTime.now());
        }

        Order saved = orderRepository.save(order);
        cartItemRepository.deleteByUser_UserId(request.getUserId());
        return saved;
    }
}
