package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.corndev.api.domain.Event;
import ru.corndev.api.domain.InviteToEvent;
import ru.corndev.api.domain.User;

import java.util.List;

@Repository
public interface InviteToEventRepo extends CrudRepository<InviteToEvent, Long> {

    InviteToEvent findByUser(User user);

    List<InviteToEvent> findByEvent(Event event);

}
