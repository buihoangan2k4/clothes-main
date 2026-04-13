package com.clotheshop.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    public String generateToken(String userName, String role) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .subject(userName)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(key())
                .compact();
    }

    public String extractUserName(String token) {
        return claims(token).getSubject();
    }

    public boolean isValid(String token) {
        try {
            return claims(token).getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    private Claims claims(String token) {
        return Jwts.parser().verifyWith((javax.crypto.SecretKey) key()).build().parseSignedClaims(token).getPayload();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
