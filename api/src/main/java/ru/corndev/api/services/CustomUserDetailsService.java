package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.corndev.api.domain.User;
import ru.corndev.api.repos.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(s);
        if (user == null) {
            new UsernameNotFoundException("Пользователь не найден");
        }
        return user;
    }

    @Transactional
    public User loadUserById(Long id) throws UsernameNotFoundException {
        User user = userRepo.getById(id);
        if (user == null) {
            new UsernameNotFoundException("Пользователь не найден");
        }
        return user;
    }
}
