package ru.corndev.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.corndev.api.domain.User;
import ru.corndev.api.payload.JWTLoginSuccessResponse;
import ru.corndev.api.payload.LoginRequest;
import ru.corndev.api.security.JwtTokenProvider;
import ru.corndev.api.services.MapValidationErrorService;
import ru.corndev.api.services.UserService;
import ru.corndev.api.validator.UserValidator;



import javax.validation.Valid;

import java.security.Principal;

import static ru.corndev.api.security.SecurityConfig.TOKEN_PREFIX;

@RestController
@RequestMapping("api/")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    @Autowired
    private UserValidator userValidator;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/users/login")
    public ResponseEntity<?> authenticateUser(
            @Valid
            @RequestBody LoginRequest loginRequest,
            BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + jwtTokenProvider.generatedToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true,jwt));
    }

    @PostMapping("/users/register")
    public ResponseEntity<?> registerUser(
            @Valid
            @RequestBody User user,
            BindingResult result) {

        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        User newUser = userService.saveUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/user/info")
    public ResponseEntity<?> getUserInfo(Principal principal){
        User theUser = userService.loadUserInfo(principal.getName());
        return new ResponseEntity<>(theUser,HttpStatus.OK);
    }

    @PostMapping("/user/invite/{email}")
    public ResponseEntity<?> sendInvite(@PathVariable String email, BindingResult result, Principal principal){
        userService.sendingInviteByUsername(email, principal.getName());
        return new ResponseEntity<>("Запрос в друзья отправлен", HttpStatus.OK);
    }

}
