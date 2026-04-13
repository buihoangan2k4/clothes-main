package com.clotheshop.repository;

import com.clotheshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String userName);
    boolean existsByUserName(String userName);
}
