package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.corndev.api.domain.Playground;

@Repository
public interface PlaygroundRepo extends CrudRepository<Playground, Long> {

   Playground findByPlaygroundName(String playgroundName);

   Playground findById(long id);

   @Override
   Iterable<Playground> findAll();
}
