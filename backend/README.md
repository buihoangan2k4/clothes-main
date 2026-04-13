# Clothes Shop Backend (Spring Boot + MySQL)

This backend is implemented to support the existing frontend API contracts under `/api`.

## Tech stack
- Java 17
- Spring Boot 3
- Maven
- Spring Web
- Spring Data JPA
- Spring Validation
- Spring Security + JWT
- MySQL Driver
- Lombok

## API modules
- Auth/User APIs: register/login (`/api/auth`)
- Product APIs (`/api/products`)
- Category APIs (`/api/categories`)
- Cart APIs (`/api/cart`)
- Order APIs (`/api/orders`)
- Admin APIs (`/api/admin`)

## Project structure
```
src/main/java/com/clotheshop/
  config/
  controller/
  dto/
  entity/
  repository/
  security/
  service/
    impl/
```

## Setup
1. Create MySQL database (or allow auto-create): `clothes_shop`.
2. Copy and edit config:
   - `src/main/resources/application.properties.example` -> `application.properties`
3. Update DB username/password and JWT secret.
4. Run:
   ```bash
   mvn spring-boot:run
   ```
5. API base URL: `http://localhost:8080/api`

## Notes for frontend compatibility
- Responses are wrapped as `{ message, data }` to match frontend parsers.
- Implemented frontend-used routes like:
  - `/products/available`, `/products/search`, `/products/{id}`
  - `/cart/cart-items/{userId}`, `/cart/total/{userId}`
  - `/orders/{userId}/create-order`

## Basic auth flow
- `POST /api/auth/register`
- `POST /api/auth/login`
- JWT is returned in `data.token`.

