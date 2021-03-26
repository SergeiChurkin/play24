package ru.corndev.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.corndev.api.domain.EventType;
import ru.corndev.api.domain.Schedule;
import ru.corndev.api.repos.ScheduleRepo;

@RestController
@RequestMapping("api/schedule")
@CrossOrigin
public class ScheduleController {

    @Autowired
    private ScheduleRepo scheduleRepo;

    @GetMapping("/{event_id}")
    Iterable<Schedule> getSchedulesByEvent(@PathVariable long eventId){
        return scheduleRepo.findByEventId(eventId);
    }
}
