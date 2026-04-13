package com.clotheshop.repository;

import com.clotheshop.entity.Order;
import com.clotheshop.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderStatus(OrderStatus orderStatus);
    List<Order> findByUser_UserId(Long userId);
}
