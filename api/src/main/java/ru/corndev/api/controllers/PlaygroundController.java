package ru.corndev.api.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.services.PlaygroundService;

@RestController
@RequestMapping("api/playground")
public class PlaygroundController {

    @Autowired
    private PlaygroundService playgroundService;

    @PostMapping("")
    public ResponseEntity<Playground> createNewPlayground(@RequestBody Playground playground){
        Playground thePlayground = playgroundService.saveOrUpdatePlayground(playground);
        return new ResponseEntity<Playground>(playground, HttpStatus.CREATED);
    }
}
