package ru.corndev.api.security;

import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import ru.corndev.api.domain.User;

import static ru.corndev.api.security.SecurityConfig.EXPIRATION_TIME;
import static ru.corndev.api.security.SecurityConfig.SECRET;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {

    public String generatedToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        Date now = new Date(System.currentTimeMillis());

        Date expireDate = new Date(now.getTime() + EXPIRATION_TIME);

        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", Long.toString(user.getId()));
        claims.put("username", user.getUsername());
        claims.put("nickname", user.getFullName());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException signatureException) {
            System.out.println("Invalid Jwt Signature");
        } catch (MalformedJwtException malformedJwtException) {
            System.out.println("Invalid Jwt Token");
        } catch (ExpiredJwtException expiredJwtException) {
            System.out.println("Token was expired");
        } catch (UnsupportedJwtException unsupportedJwtException) {
            System.out.println("Unsupported exception");
        } catch (IllegalArgumentException illegalArgumentException) {
            System.out.println("JWT claims is empty");
        }
        return false;
    }


        public Long getUserIdFromJwt(String token){
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String  id = (String) claims.get("id");
        return Long.parseLong(id);
        }
}
