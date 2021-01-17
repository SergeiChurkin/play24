package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.Event;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.exceptions.AppException;
import ru.corndev.api.repos.EventRepo;

@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;

    public Event saveOrUpdateEvent(Event event){
        try{
            return eventRepo.save(event);
        }
        catch (Exception ex) {
            throw new AppException("Мероприятие с таким именем уже существует :'"+event.getEventName()+"'");
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
