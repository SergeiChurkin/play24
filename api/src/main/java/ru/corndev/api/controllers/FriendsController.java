package ru.corndev.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.corndev.api.domain.User;
import ru.corndev.api.services.FriendsService;
import ru.corndev.api.services.UserService;

import java.security.Principal;

@RestController
@RequestMapping("api/friends")
@CrossOrigin
public class FriendsController {
    @Autowired
    private FriendsService friendsService;


    @PostMapping("/invite/{email}")
    public ResponseEntity<?> sendInvite(@PathVariable String email, Principal principal){

        friendsService.sendingInviteByUsername(email, principal.getName());
        return new ResponseEntity<>("Запрос в друзья отправлен", HttpStatus.OK);
    }

    @GetMapping("/invites/")
    public Iterable<?> getInvites(Principal principal){
        return friendsService.gettingInvites(principal.getName());
    }
}
