package ru.corndev.api.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.corndev.api.domain.Playground;
import ru.corndev.api.services.MapValidationErrorService;
import ru.corndev.api.services.PlaygroundService;

import javax.validation.Valid;

@RestController
@RequestMapping("api/playground")
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
}
