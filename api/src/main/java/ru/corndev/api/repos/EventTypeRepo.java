package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import ru.corndev.api.domain.EventType;

public interface EventTypeRepo extends CrudRepository<EventType, Long> {

    EventType findById(long id);

    EventType findByEventsId(long id);

    @Override
    Iterable<EventType> findAll();
}
