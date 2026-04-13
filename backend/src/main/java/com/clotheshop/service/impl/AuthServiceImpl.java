package com.clotheshop.service.impl;

import com.clotheshop.dto.AuthDtos;
import com.clotheshop.entity.Role;
import com.clotheshop.entity.User;
import com.clotheshop.repository.UserRepository;
import com.clotheshop.security.JwtService;
import com.clotheshop.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthDtos.AuthData register(AuthDtos.RegisterRequest request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new RuntimeException("Username already exists");
        }

        User user = userRepository.save(User.builder()
                .userName(request.getUserName())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .role(Role.USER)
                .build());

        String token = jwtService.generateToken(user.getUserName(), user.getRole().name());
        AuthDtos.AuthData data = new AuthDtos.AuthData();
        data.setUserId(user.getUserId());
        data.setUserName(user.getUserName());
        data.setRole(user.getRole().name());
        data.setToken(token);
        return data;
    }

    @Override
    public AuthDtos.AuthData login(AuthDtos.LoginRequest request) {
        User user = userRepository.findByUserName(request.getUserName())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtService.generateToken(user.getUserName(), user.getRole().name());
        AuthDtos.AuthData data = new AuthDtos.AuthData();
        data.setUserId(user.getUserId());
        data.setUserName(user.getUserName());
        data.setRole(user.getRole().name());
        data.setToken(token);
        return data;
    }
}
