package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.corndev.api.domain.Playground;

@Repository
public interface PlaygroundRepo extends CrudRepository<Playground, Long> {

    @Override
    Iterable<Playground> findAllById(Iterable<Long> iterable);
}
