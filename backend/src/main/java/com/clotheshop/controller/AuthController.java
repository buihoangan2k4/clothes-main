package com.clotheshop.controller;

import com.clotheshop.dto.ApiResponse;
import com.clotheshop.dto.AuthDtos;
import com.clotheshop.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthDtos.AuthData> register(@Valid @RequestBody AuthDtos.RegisterRequest request) {
        return new ApiResponse<>("Registered successfully", authService.register(request));
    }

    @PostMapping("/login")
    public ApiResponse<AuthDtos.AuthData> login(@Valid @RequestBody AuthDtos.LoginRequest request) {
        return new ApiResponse<>("Login successfully", authService.login(request));
    }
}
