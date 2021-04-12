package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import ru.corndev.api.domain.FriendRequest;

public interface FriendRequestRepo extends CrudRepository<FriendRequest, Long> {

}
