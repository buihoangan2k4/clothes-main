package com.clotheshop.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class AuthDtos {
    @Data
    public static class RegisterRequest {
        @NotBlank
        private String userName;
        @NotBlank
        private String password;
        private String firstName;
        private String lastName;
        private String phoneNumber;
        private String authProvider;
    }

    @Data
    public static class LoginRequest {
        @NotBlank
        private String userName;
        @NotBlank
        private String password;
        private String authProvider;
    }

    @Data
    public static class AuthData {
        private Long userId;
        private String userName;
        private String role;
        private String token;
    }
}
