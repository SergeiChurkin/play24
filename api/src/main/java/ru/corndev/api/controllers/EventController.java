package ru.corndev.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.corndev.api.domain.Event;
import ru.corndev.api.domain.Schedule;
import ru.corndev.api.domain.User;
import ru.corndev.api.models.CompleteEvent;
import ru.corndev.api.services.EventService;
import ru.corndev.api.services.FriendsService;
import ru.corndev.api.services.MapValidationErrorService;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("api/event")
@CrossOrigin
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private FriendsService friendsService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{event_id}")
    public ResponseEntity<?> createOrUpdateNewEvent(
            @Valid
            @RequestBody CompleteEvent completeEvent,
            BindingResult result,
            @PathVariable long event_id,
            Principal principal
    ) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Event theEvent = eventService.saveOrUpdateEvent(event_id, completeEvent.event, completeEvent.schedules, principal.getName());

        return new ResponseEntity<>(theEvent, HttpStatus.CREATED);
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<?> getEventById(@PathVariable long eventId, Principal principal) {
        Event theEvent = eventService.findEventById(eventId, principal.getName());
        return new ResponseEntity<>(theEvent, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Event> getAllEvents(Principal principal) {
        //if (!principal.getName().isEmpty()) {
            return eventService.findAllEvents(principal.getName());
        //}
        //return null;
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> deleteEventById(@PathVariable long eventId, Principal principal) {
        eventService.deleteEventById(eventId, principal.getName());
        return new ResponseEntity<>("Мероприятие было удалено", HttpStatus.OK);
    }

    @GetMapping("/{eventId}/invites")
    public Iterable<User> getFriendsReadyToInvite(@PathVariable long eventId, Principal principal){
        return friendsService.getFriendsForInviteToEvent(eventId,principal.getName());
    }

    @GetMapping("/{eventId}/{userId}/invites")
    public ResponseEntity<?> sendingInviteToEvent(@PathVariable long eventId,
                                                  @PathVariable long userId,
                                                  Principal principal){
        friendsService.sendingInviteToEvent(eventId,userId,principal.getName());
        return new ResponseEntity<>("Приглашение на мероприятие отправлено", HttpStatus.OK);
    }
}
