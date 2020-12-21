package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.repos.PlaygroundRepo;

@Service
public class PlaygroundService {

    @Autowired
    private PlaygroundRepo playgroundRepo;

    public Playground saveOrUpdatePlayground(Playground playground){

        return playgroundRepo.save(playground);
    }
}
