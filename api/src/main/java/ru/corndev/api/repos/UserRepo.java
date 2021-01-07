package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.corndev.api.domain.User;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {

    User findByUsername(String username);

    User findById(long id);

    @Override
    Iterable<User> findAll();
}
