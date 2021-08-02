package ru.corndev.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.corndev.api.domain.User;
import ru.corndev.api.services.FriendsService;
import ru.corndev.api.services.InviteService;

import java.security.Principal;

@RestController
@RequestMapping("api/invites")
@CrossOrigin
public class InviteToEventController {

    @Autowired
    private InviteService inviteService;

    @GetMapping("/{eventId}")
    public Iterable<User> getFriendsReadyToInvite(@PathVariable long eventId, Principal principal){
        return inviteService.getFriendsForInviteToEvent(eventId,principal.getName());
    }

    @GetMapping("/{eventId}/{userId}")
    public ResponseEntity<?> sendingInviteToEvent(@PathVariable long eventId,
                                                  @PathVariable long userId,
                                                  Principal principal){
        inviteService.sendingInviteToEvent(eventId,userId,principal.getName());
        return new ResponseEntity<>("Приглашение на мероприятие отправлено", HttpStatus.OK);
    }
}
