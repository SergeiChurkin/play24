package ru.corndev.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.exceptions.EventException;
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
            throw new EventException("Площадка с таким именем уже существует :''");
        }
    }

/*    public Playground findPgByName(String name){
        Playground thePlayground = playgroundRepo.findByPlaygroundName(name);
        if(thePlayground==null){
            throw new AppException("Площадка с таким именем не найдена");
        }
        return thePlayground;
    }*/

    public Playground findPgById(long id){
        Playground thePlayground = playgroundRepo.findById(id);
        if(thePlayground==null){
            throw new EventException("Площадка с таким ID не найдена");
        }
        return thePlayground;
    }

    public Iterable<Playground> findAllPg(){
        return playgroundRepo.findAll();
    }

    public void deletePgById(long id){
        Playground thePlayground = playgroundRepo.findById(id);
        if(thePlayground==null){
            throw new EventException("Ошибка при удалении площадки");
        }
        playgroundRepo.delete(thePlayground);
    }
}
