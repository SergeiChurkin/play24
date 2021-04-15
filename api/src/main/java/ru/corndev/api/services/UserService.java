package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.FriendRequest;
import ru.corndev.api.domain.User;
import ru.corndev.api.exceptions.UsernameAlreadyExistsException;
import ru.corndev.api.repos.FriendRequestRepo;
import ru.corndev.api.repos.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private FriendRequestRepo friendRequestRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public static final int DISPATCHED=1;
    public static final int CONFIRMED=2;
    public static final int REJECTED=3;



    public User saveUser(User newUser){

        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            newUser.setConfirmPassword("");
            return userRepo.save(newUser);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Такой Email уже зарегистрирован");
        }

    }

    public User loadUserInfo(String username){
            User theUser = userRepo.findByUsername(username);
            if(theUser==null){
                throw new UsernameAlreadyExistsException("Пользователь не найден");
            }
            return theUser;
    }

    public void sendingInviteByUsername(String toUsername, String fromUsername){
        User toUser = userRepo.findByUsername(toUsername);
        User fromUser = userRepo.findByUsername(fromUsername);
        if(toUser==null || fromUser==null){
            throw new UsernameAlreadyExistsException("Ошибка в запросе в друзья");
        }
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setRequestFromUserId(fromUser.getId());
        friendRequest.setRequestToUserId(toUser.getId());
        friendRequest.setStatus(DISPATCHED);
        friendRequestRepo.save(friendRequest);
    }
}
