package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.FriendRequest;
import ru.corndev.api.domain.User;
import ru.corndev.api.exceptions.UsernameAlreadyExistsException;
import ru.corndev.api.repos.FriendsRepo;
import ru.corndev.api.repos.UserRepo;

@Service
public class FriendsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FriendsRepo friendsRepo;

    public static final int DISPATCHED=1;
    public static final int CONFIRMED=2;
    public static final int REJECTED=3;

    public void sendingInviteByUsername(String toUsername, String fromUsername){
        User toUser = userRepo.findByUsername(toUsername);
        User fromUser = userRepo.findByUsername(fromUsername);
        if(toUser==null || fromUser==null){
            throw new UsernameAlreadyExistsException("Ошибка в запросе в друзья");
        }
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setRequestFromId(fromUser.getId());
        friendRequest.setRequestToId(toUser.getId());
        friendRequest.setStatus(DISPATCHED);
        friendsRepo.save(friendRequest);
    }

    public Iterable<?> gettingInvites(String username) {
        User toUser = userRepo.findByUsername(username);
        return friendsRepo.findByRequestToId(toUser.getId());
    }
}
