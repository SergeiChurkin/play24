package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.Event;
import ru.corndev.api.domain.FriendRequest;
import ru.corndev.api.domain.InviteToEvent;
import ru.corndev.api.domain.User;
import ru.corndev.api.exceptions.EmailFriendRequestException;
import ru.corndev.api.repos.EventRepo;
import ru.corndev.api.repos.FriendsRequestRepo;
import ru.corndev.api.repos.InviteToEventRepo;
import ru.corndev.api.repos.UserRepo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class FriendsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EventRepo eventRepo;

    @Autowired
    private InviteToEventRepo inviteRepo;

    @Autowired
    private FriendsRequestRepo friendsRequestRepo;

    public static final int DISPATCHED = 1;
    public static final int CONFIRMED = 2;
    public static final int DECLINE = 0;

    public void sendingInviteByUsername(String toUsername, String fromUsername) {
        User toUser = userRepo.findByUsername(toUsername);
        User fromUser = userRepo.findByUsername(fromUsername);
        if (toUser == null || fromUser == null) {
            throw new EmailFriendRequestException("Произошла ошибка при отправке запроса в друзья. " +
                    "Проверьте корректность введеного Email");
        }
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setSender(fromUser.getUsername());
        friendRequest.setNickname(fromUser.getNickname());
        friendRequest.setRecipient(toUser.getUsername());
        friendRequest.setStatus(DISPATCHED);
        friendsRequestRepo.save(friendRequest);
    }

    public Iterable<?> gettingInvites(String username) {
        User toUser = userRepo.findByUsername(username);
        return friendsRequestRepo.findByRecipient(toUser.getUsername());
    }

    public void deleteInvite(long id) {
        FriendRequest friendRequest = friendsRequestRepo.findById(id);
        if (friendRequest != null) {
            friendsRequestRepo.delete(friendRequest);
        }
    }

    public void acceptRequest(long id) {
        FriendRequest friendRequest = friendsRequestRepo.findById(id);
        if (friendRequest != null) {
            User toUser = userRepo.findByUsername(friendRequest.getRecipient());
            User fromUser = userRepo.findByUsername(friendRequest.getSender());
            friendRequest.setStatus(CONFIRMED);
            toUser.addFriend(fromUser);
            userRepo.save(toUser);
            fromUser.addFriend(toUser);
            userRepo.save(fromUser);
            friendsRequestRepo.save(friendRequest);

        }
    }

    public Set<User> getFriends(String username) {
        User user = userRepo.findByUsername(username);
        if (user != null) {
            return user.getFriends();
        } else return null;
    }

    public Set<User> getFriendsForInviteToEvent(long eventId, String username) {
        Set<User> returnedUsers = new HashSet<>();
        Event event = eventRepo.findById(eventId);
        User user = userRepo.findByUsername(username);
        if (event != null && user != null) {
            returnedUsers = user.getFriends();
            List<InviteToEvent> invites = inviteRepo.findByEvent(event);
            for (InviteToEvent invite : invites
            ) {
                returnedUsers.remove(invite.getUser());
            }
        }
        return returnedUsers;
    }

    public void sendingInviteToEvent(long eventId, long userId, String username) {
        Event event = eventRepo.findById(eventId);
        User user = userRepo.getById(userId);
        if (event != null && user != null) {
            if (inviteRepo.findByEvent(event) == null && inviteRepo.findByUser(user) == null) {
                InviteToEvent inviteToEvent = new InviteToEvent();
                inviteToEvent.setEvent(event);
                inviteToEvent.setUser(user);
                event.addInvite(inviteToEvent);
                eventRepo.save(event);
                user.addInvite(inviteToEvent);
                userRepo.save(user);
                inviteRepo.save(inviteToEvent);
            }
        }

    }
}
