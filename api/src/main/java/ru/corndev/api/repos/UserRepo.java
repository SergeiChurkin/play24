package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.corndev.api.domain.User;

import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {
    User findByUsername(String username);

    User getById(Long id);


}