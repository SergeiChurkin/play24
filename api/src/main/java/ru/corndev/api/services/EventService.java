package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.Event;
import ru.corndev.api.domain.EventType;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.domain.Schedule;
import ru.corndev.api.exceptions.AppException;
import ru.corndev.api.repos.EventRepo;
import ru.corndev.api.repos.EventTypeRepo;
import ru.corndev.api.repos.PlaygroundRepo;

import java.util.Set;

@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;

    @Autowired
    private PlaygroundRepo playgroundRepo;
    @Autowired
    private EventTypeRepo eventTypeRepo;

    public Event saveOrUpdateEvent(long eventTypeId, Event event, Set<Schedule> schedules){
        EventType eventType = eventTypeRepo.findById(eventTypeId);
        if(eventType==null){
            throw new AppException("Выберите тип мероприятия");
        }
        try{
            if(event.getId()==null){// new event
                Playground playground = new Playground();
                if(schedules!=null && !schedules.isEmpty()){
                    for (Schedule sch:schedules
                         ) {
                        if(sch.getDay()!="" && sch.getTime()!="") {
                            Schedule schedule = new Schedule();
                            schedule.setDay(sch.getDay());
                            schedule.setTime(sch.getTime());
                            event.addScheduleItem(schedule);
                        }
                    }
                }
                event.setEventType(eventType);
                event.setPlayground(playground);
                playground.setEvent(event);
            }else{// update event
                event.setEventType(eventType);
                event.setPlayground(playgroundRepo.findByEventId(event.getId()));
            }
            return eventRepo.save(event);
        }
        catch (Exception ex) {
            throw new AppException("Ошибка при создании/обновлении мероприятия \n"+ex);
        }
    }

    public Event findEventByName(String name){
        Event theEvent = eventRepo.findByEventName(name);
        if(theEvent==null){
            throw new AppException("Мероприятие с таким именем не найдено");
        }
        return theEvent;
    }

    public Event findEventById(long id){
        Event theEvent = eventRepo.findById(id);
        if(theEvent==null){
            throw new AppException("Мероприятие с таким ID не найдено");
        }
        return theEvent;
    }

    public Iterable<Event> findAllEvents(){
        return eventRepo.findAll();
    }

    public void deleteEventById(long id){
        Event theEvent = eventRepo.findById(id);
        if(theEvent==null){
            throw new AppException("Ошибка при удалении мероприятия");
        }
        eventRepo.delete(theEvent);
    }
}
