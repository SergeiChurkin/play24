package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.corndev.api.domain.User;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {


}
