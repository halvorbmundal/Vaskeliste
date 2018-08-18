package com.example.guttavaskbackend.controllers;

import com.example.guttavaskbackend.objects.ApplicationUser;
import com.example.guttavaskbackend.objects.Collective;
import com.example.guttavaskbackend.repositories.CollectiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.transaction.Transactional;

@RestController
@RequestMapping("collective")
@Transactional
public class CollectiveController {

    private final CollectiveRepository collectiveRepository;
    private final UserController userController;

    @Inject
    public CollectiveController(CollectiveRepository collectiveRepository, UserController userController) {
        this.collectiveRepository = collectiveRepository;
        this.userController = userController;
    }

    @PostMapping(value = "/create")
    public Collective createCollective(@RequestBody Collective collective){
        Assert.notNull(collective.name, "Kollektivet mangler navn");
        Collective collective1 = collectiveRepository.save(collective);
        userController.getUser().setCollective(collective1);
        return collective1;
    }
}
