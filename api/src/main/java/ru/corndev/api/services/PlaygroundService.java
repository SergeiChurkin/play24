package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.exceptions.PgNameException;
import ru.corndev.api.repos.PlaygroundRepo;

@Service
public class PlaygroundService {

    @Autowired
    private PlaygroundRepo playgroundRepo;

    public Playground saveOrUpdatePlayground(Playground playground){
        try{
            return playgroundRepo.save(playground);
        }
        catch (Exception ex) {
            throw new PgNameException("Площадка с таким именем уже существует "+playground.getPlaygroundName());
        }
    }
}
