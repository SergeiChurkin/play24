package ru.corndev.api.models;

import ru.corndev.api.domain.Event;
import ru.corndev.api.domain.Schedule;

import java.util.HashSet;
import java.util.Set;

public class CompleteEvent {
    public Event event;
    public Set<Schedule> schedules = new HashSet<>();

    public CompleteEvent() {

    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Set<Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(Set<Schedule> schedules) {
        this.schedules = schedules;
    }

    @Override
    public String toString() {
        return "CompleteEvent{" +
                "event=" + event +
                ", schedules=" + schedules +
                '}';
    }
}
