package ru.corndev.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.domain.User;
import ru.corndev.api.services.MapValidationErrorService;
import ru.corndev.api.services.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewUser(
            @Valid
            @RequestBody User user,
            BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        User theUser = userService.saveOrUpdateUser(user);
        return new ResponseEntity<>(theUser, HttpStatus.CREATED);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByName(@PathVariable String username){
        User theUser =  userService.findByUsername(username);
        return new ResponseEntity<>(theUser, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<User> getAllUsers(){
        return userService.findAllUsers();
    }
}
