package ru.corndev.api.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.corndev.api.domain.FriendRequest;
import ru.corndev.api.domain.User;

@Repository
public interface FriendsRepo extends CrudRepository<FriendRequest, Long> {

    FriendRequest findById(long id);

    Iterable<?> findByRecipient(String username);


}
