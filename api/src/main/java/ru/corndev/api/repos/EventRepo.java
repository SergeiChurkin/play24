package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.corndev.api.domain.Event;

@Repository
public interface EventRepo extends CrudRepository<Event, Long> {
     Event findByEventName(String name);

     Event findById(long id);

    @Override
    Iterable<Event> findAll();
}
