package ru.corndev.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.corndev.api.domain.User;
import ru.corndev.api.payload.FriendRequestPayload;
import ru.corndev.api.services.FriendsService;
import ru.corndev.api.services.MapValidationErrorService;
import ru.corndev.api.services.UserService;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("api/friends")
@CrossOrigin
public class FriendsController {

    @Autowired
    private FriendsService friendsService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/invites")
    public ResponseEntity<?> sendInvite(
            @Valid
            @RequestBody FriendRequestPayload friendRequestPayload,
            BindingResult result,
            Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        friendsService.sendingInviteByUsername(friendRequestPayload.getEmail(), principal.getName());
        return new ResponseEntity<>("Запрос в друзья отправлен", HttpStatus.OK);
    }

    @GetMapping("/invites")
    public Iterable<?> getInvites(Principal principal){
        return friendsService.gettingInvites(principal.getName());
    }

    @DeleteMapping("/invites/{id}")
    public ResponseEntity<?> deleteInviteById(@PathVariable long id) {
        friendsService.deleteInvite(id);
        return new ResponseEntity<>("Запрос в друзья удален", HttpStatus.OK);
    }

    @GetMapping("/accept/{id}")
    public ResponseEntity<?> acceptRequestById(@PathVariable long id){
        friendsService.acceptRequest(id);
        return new ResponseEntity<>("Запрос в друзья принят", HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<User> getAllFriends(Principal principal){
        return friendsService.getFriends(principal.getName());
    }


}
