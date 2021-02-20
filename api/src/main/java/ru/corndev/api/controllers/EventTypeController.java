package ru.corndev.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.corndev.api.domain.EventType;
import ru.corndev.api.repos.EventTypeRepo;

@RestController
@RequestMapping("api/eventtypes")
@CrossOrigin
public class EventTypeController {

    @Autowired
    private EventTypeRepo eventTypeRepo;

    @GetMapping("/all")
    Iterable<EventType> getAllEventTypes(){
        return eventTypeRepo.findAll();
    }
}
