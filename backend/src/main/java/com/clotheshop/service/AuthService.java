package com.clotheshop.service;

import com.clotheshop.dto.AuthDtos;

public interface AuthService {
    AuthDtos.AuthData register(AuthDtos.RegisterRequest request);
    AuthDtos.AuthData login(AuthDtos.LoginRequest request);
}
