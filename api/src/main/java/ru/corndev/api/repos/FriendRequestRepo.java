package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.corndev.api.domain.FriendRequest;

@Repository
public interface FriendRequestRepo extends CrudRepository<FriendRequest, Long> {

    FriendRequest getById(long id);
}
