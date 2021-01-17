package ru.corndev.api.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.services.MapValidationErrorService;
import ru.corndev.api.services.PlaygroundService;

import javax.validation.Valid;

@RestController
@RequestMapping("api/playground")
@CrossOrigin
public class PlaygroundController {

    @Autowired
    private PlaygroundService playgroundService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewPlayground(
            @Valid
            @RequestBody Playground playground,
            BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Playground thePlayground = playgroundService.saveOrUpdatePlayground(playground);
        return new ResponseEntity<Playground>(thePlayground, HttpStatus.CREATED);
    }

    @GetMapping("/{pgName}")
    public ResponseEntity<?> getPgByName(@PathVariable String pgName){
        Playground thePlayground =  playgroundService.findPgByName(pgName);
        return new ResponseEntity<Playground>(thePlayground, HttpStatus.OK);
    }
    @GetMapping("/id/{pgId}")
    public ResponseEntity<?> getPgByName(@PathVariable long pgId){
        Playground thePlayground =  playgroundService.findPgById(pgId);
        return new ResponseEntity<Playground>(thePlayground, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Playground> getAllPg(){
        return playgroundService.findAllPg();
    }

    @DeleteMapping("/{pgId}")
    public ResponseEntity<?> deletePgById(@PathVariable long pgId){
        playgroundService.deletePgById(pgId);
        return new ResponseEntity<String>("Площадка была удалена", HttpStatus.OK);
    }
}
