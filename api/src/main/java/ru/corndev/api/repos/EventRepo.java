package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.corndev.api.domain.Event;
import ru.corndev.api.domain.EventType;

@Repository
public interface EventRepo extends CrudRepository<Event, Long> {
    Event findByEventName(String name);

    Event findById(long id);

    EventType findByEventTypeId(long id);

    @Override
    Iterable<Event> findAll();

    Iterable<Event> findAllByEventLeader(String username);
}
