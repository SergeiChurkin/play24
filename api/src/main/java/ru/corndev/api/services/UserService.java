package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.domain.User;
import ru.corndev.api.exceptions.AppException;
import ru.corndev.api.repos.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public User saveOrUpdateUser(User user){
        try{
        return userRepo.save(user);
        }
        catch (Exception ex){
            throw new AppException("Пользователь с таким именем уже существует");
        }
    }

    public User findByUsername(String name){
        User theUser = userRepo.findByUsername(name);
        if(theUser==null){
            throw new AppException("Пользователь с таким именем не найден");
        }
        return theUser;
    }

    public Iterable<User> findAllUsers(){
        return userRepo.findAll();
    }
}
