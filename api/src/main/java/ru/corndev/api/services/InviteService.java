package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.Event;
import ru.corndev.api.domain.InviteToEvent;
import ru.corndev.api.domain.User;
import ru.corndev.api.repos.EventRepo;
import ru.corndev.api.repos.InviteToEventRepo;
import ru.corndev.api.repos.UserRepo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class InviteService {
@Autowired
private EventRepo eventRepo;

@Autowired
private UserRepo userRepo;

@Autowired
private InviteToEventRepo inviteRepo;

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
            if (inviteRepo.findByUser(user) == null) {
                InviteToEvent inviteToEvent = new InviteToEvent();
                inviteToEvent.setEvent(event);
                inviteToEvent.setUser(user);
                event.addInvite(inviteToEvent);
                //eventRepo.save(event);
                user.addInvite(inviteToEvent);
                //userRepo.save(user);
                inviteRepo.save(inviteToEvent);
            }
        }

    }
}
