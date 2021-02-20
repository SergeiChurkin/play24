package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.Event;
import ru.corndev.api.domain.EventType;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.exceptions.AppException;
import ru.corndev.api.repos.EventRepo;
import ru.corndev.api.repos.EventTypeRepo;
import ru.corndev.api.repos.PlaygroundRepo;

@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;

    @Autowired
    private PlaygroundRepo playgroundRepo;
    @Autowired
    private EventTypeRepo eventTypeRepo;

    public Event saveOrUpdateEvent(long eventTypeId, Event event){
        try{
            if(event.getId()==null){
                Playground playground = new Playground();
                EventType eventType = eventTypeRepo.findById(eventTypeId);
                event.setEventType(eventType);
                event.setPlayground(playground);
                playground.setEvent(event);

            }else{
                event.setEventType(eventTypeRepo.findByEventsId(event.getId()));
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
