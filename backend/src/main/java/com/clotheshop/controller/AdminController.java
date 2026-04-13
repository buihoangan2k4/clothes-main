package com.clotheshop.controller;

import com.clotheshop.dto.ApiResponse;
import com.clotheshop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserRepository userRepository;

    @GetMapping("/dashboard")
    public ApiResponse<Map<String, Object>> dashboard() {
        return new ApiResponse<>("OK", Map.of("totalUsers", userRepository.count()));
    }

    @GetMapping("/users")
    public ApiResponse<Object> users() {
        return new ApiResponse<>("OK", userRepository.findAll());
    }
}
