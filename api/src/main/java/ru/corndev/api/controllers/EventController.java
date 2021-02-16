package ru.corndev.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.corndev.api.domain.Event;
import ru.corndev.api.services.EventService;
import ru.corndev.api.services.MapValidationErrorService;

import javax.validation.Valid;

@RestController
@RequestMapping("api/event")
@CrossOrigin
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewEvent(
            @Valid
            @RequestBody Event event,
            @RequestParam(required=false, name = "eventTypeId") Long eventTypeId,
            BindingResult result
            ){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Event theEvent = eventService.saveOrUpdateEvent(event,eventTypeId);
        return new ResponseEntity<>(theEvent, HttpStatus.CREATED);
    }

/*    @GetMapping("/{eventName}")
    public ResponseEntity<?> getEventByName(@PathVariable String eventName){
        Event theEvent =  eventService.findEventByName(eventName);
        return new ResponseEntity<>(theEvent, HttpStatus.OK);
    }*/

    @GetMapping("/{eventId}")
    public ResponseEntity<?> getEventById(@PathVariable long eventId){
        Event theEvent =  eventService.findEventById(eventId);
        return new ResponseEntity<>(theEvent, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Event> getAllEvents(){
        return eventService.findAllEvents();
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> deleteEventById(@PathVariable long eventId){
        eventService.deleteEventById(eventId);
        return new ResponseEntity<>("Мероприятие было удалено", HttpStatus.OK);
    }
}
