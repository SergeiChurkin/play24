package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.FriendRequest;
import ru.corndev.api.domain.User;
import ru.corndev.api.exceptions.EmailFriendRequestException;
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
    public static final int DECLINE=0;

    public void sendingInviteByUsername(String toUsername, String fromUsername){
        User toUser = userRepo.findByUsername(toUsername);
        User fromUser = userRepo.findByUsername(fromUsername);
        if(toUser==null || fromUser==null){
            throw new EmailFriendRequestException("Произошла ошибка при отправке запроса в друзья. " +
                    "Проверьте корректность введеного Email");
        }
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setSender(fromUser.getUsername());
        friendRequest.setNickname(fromUser.getNickname());
        friendRequest.setRecipient(toUser.getUsername());
        friendRequest.setStatus(DISPATCHED);
        friendsRepo.save(friendRequest);
    }

    public Iterable<?> gettingInvites(String username) {
        User toUser = userRepo.findByUsername(username);
        return friendsRepo.findByRecipient(toUser.getUsername());
    }

    public void deleteInvite(long id) {
        FriendRequest friendRequest = friendsRepo.findById(id);
        if(friendRequest!=null){
            friendsRepo.delete(friendRequest);
        }
    }
}
