package com.example.guttavaskbackend.controllers;

import com.example.guttavaskbackend.objects.ApplicationUser;
import com.example.guttavaskbackend.objects.Collective;
import com.example.guttavaskbackend.repositories.CollectiveRepository;
import com.example.guttavaskbackend.repositories.UsersRepository;
import com.example.guttavaskbackend.utility.IllegalInputException;
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

    private final UsersRepository usersRepository;
    private final CollectiveRepository collectiveRepository;
    private final UserController userController;

    @Inject
    public CollectiveController(CollectiveRepository collectiveRepository, UserController userController, UsersRepository usersRepository) {
        this.collectiveRepository = collectiveRepository;
        this.userController = userController;
        this.usersRepository = usersRepository;
    }

    @PostMapping(value = "/create")
    public ApplicationUser createCollective(@RequestBody Collective collective){
        Assert.notNull(collective.name, "Collective is missing a name");
        if (collectiveRepository.findByName(collective.getName()) != null){
            throw new IllegalInputException("Collective already exists");
        }
        collective = collectiveRepository.save(collective);
        ApplicationUser user = userController.getUser();
        user.setCollective(collective);
        user.setCollectiveAdmin(true);
        user.setAcceptedInCollective(true);
        return usersRepository.save(user);
    }
}
