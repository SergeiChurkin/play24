package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.corndev.api.domain.Schedule;

import java.util.Set;

@Repository
public interface ScheduleRepo extends CrudRepository<Schedule, Long> {

    Set<Schedule> findByEventId(long id);

}
