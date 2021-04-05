package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.*;
import ru.corndev.api.exceptions.EventException;
import ru.corndev.api.repos.*;

import javax.transaction.Transactional;
import java.util.Set;

@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PlaygroundRepo playgroundRepo;
    @Autowired
    private EventTypeRepo eventTypeRepo;
    @Autowired
    private ScheduleRepo scheduleRepo;

    @Transactional
    public Event saveOrUpdateEvent(long eventTypeId, Event event, Set<Schedule> schedules, String username  ){
        EventType eventType = eventTypeRepo.findById(eventTypeId);
        if(eventType==null){
            throw new EventException("Выберите тип мероприятия");
        }
        try{
            User user = userRepo.findByUsername(username);
            event.addUser(user);
            event.setEventLeader(user.getUsername());
            if(event.getId()==null){// new event
                Playground playground = new Playground();
                if(schedules!=null && !schedules.isEmpty() && event.isRepeated()){
                    for (Schedule sch:schedules
                         ) {
                        if(!sch.getDay().equals("") && !sch.getTime().equals("")) {
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
                Set<Schedule> eventSchedules = scheduleRepo.findByEventId(event.getId());
                event.removeSchedules(eventSchedules);
                if(schedules!=null && !schedules.isEmpty() && event.isRepeated()){
                    event.setEventDate(null);
                    for (Schedule sch:schedules
                    ) {
                        if(!sch.getDay().equals("") && !sch.getTime().equals("")) {
                            Schedule schedule = new Schedule();
                            schedule.setDay(sch.getDay());
                            schedule.setTime(sch.getTime());
                            event.addScheduleItem(schedule);
                        }
                    }
                }
                else{//if not repeated
                    event.setEventDate(event.getEventDate());
                }
                //event.setPlayground(playgroundRepo.findByEventId(event.getId()));
            }
            return eventRepo.save(event);
        }
        catch (Exception ex) {
            throw new EventException("Ошибка при создании/обновлении мероприятия \n"+ex);
        }
    }

    public Event findEventByName(String name){
        Event theEvent = eventRepo.findByEventName(name);
        if(theEvent==null){
            throw new EventException("Мероприятие с таким именем не найдено");
        }
        return theEvent;
    }

    public Event findEventById(long id){
        Event theEvent = eventRepo.findById(id);
        if(theEvent==null){
            throw new EventException("Мероприятие с таким ID не найдено");
        }
        return theEvent;
    }

    public Iterable<Event> findAllEvents(){
        return eventRepo.findAll();
    }

    public void deleteEventById(long id){
        Event theEvent = eventRepo.findById(id);
        if(theEvent==null){
            throw new EventException("Ошибка при удалении мероприятия");
        }
        eventRepo.delete(theEvent);
    }
}
