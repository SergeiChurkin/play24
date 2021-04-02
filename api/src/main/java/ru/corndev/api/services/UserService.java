package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.domain.User;
import ru.corndev.api.exceptions.AppException;
import ru.corndev.api.repos.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public User saveUser(User newUser){
    newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
    return userRepo.save(newUser);
    }

/*    public User saveOrUpdateUser(User user){
        *//*
        User theUser = userRepo.findByUsername(user.getUsername());
        if(theUser!=null){
            throw new AppException("Пользователь с таким именем уже существует");
        }
        theUser = userRepo.findByPhone(user.getPhone());
        if(theUser!=null){
            throw new AppException("Пользователь с таким номером телефона уже существует");
        }
        theUser = userRepo.findByEmail(user.getEmail());
        if(theUser!=null){
            throw new AppException("Пользователь с таким email уже существует");
        }
*//*
        try{
        return userRepo.save(user);
        }
        catch (Exception ex){
            throw new AppException("Произошла ошибка при сохранении данных");
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
    }*/
}
