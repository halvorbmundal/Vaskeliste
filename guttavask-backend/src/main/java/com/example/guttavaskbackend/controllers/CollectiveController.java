package com.example.guttavaskbackend.controllers;

import com.example.guttavaskbackend.objects.ApplicationUser;
import com.example.guttavaskbackend.objects.CleaningSection;
import com.example.guttavaskbackend.objects.Collective;
import com.example.guttavaskbackend.repositories.CleaningSectionRepository;
import com.example.guttavaskbackend.repositories.CollectiveRepository;
import com.example.guttavaskbackend.repositories.UsersRepository;
import com.example.guttavaskbackend.utility.IllegalInputException;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("collective")
@Transactional
public class CollectiveController {

    private final UsersRepository usersRepository;
    private final CollectiveRepository collectiveRepository;
    private final UserController userController;
    private final CleaningSectionRepository sectionRepository;

    @Inject
    public CollectiveController(CollectiveRepository collectiveRepository, UserController userController, UsersRepository usersRepository, CleaningSectionRepository sectionRepository) {
        this.collectiveRepository = collectiveRepository;
        this.userController = userController;
        this.usersRepository = usersRepository;
        this.sectionRepository = sectionRepository;
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

    @GetMapping(value = "/acceptedusers/{collectiveName}")
    public List<ApplicationUser> getAcceptedUsers(@PathVariable String collectiveName){
        Collective collective = collectiveRepository.findByName(collectiveName);
        Assert.isTrue(userController.getUser().getCollective().getName().equals(collectiveName), "User is not a part of this collective");
        return usersRepository.findAllAcceptedUsersInCollective(collective.getId());
    }

    @GetMapping("/assigtaskstousers")
    public List<CleaningSection> assignTaskstoUsersHepler(){
        Collective collective = userController.getUser().getCollective();
        return assignTaskstoUsers(collective);
    }

    public List<CleaningSection> assignTaskstoUsers(Collective collective){
        List<ApplicationUser> users = usersRepository.findAllAcceptedUsersInCollective(collective.getId());
        List<CleaningSection> sections = collectiveRepository.findAllSectionsInCollective(collective.getId());
        for (int i=0; i<sections.size(); i++) {
            int numberOfUsers = users.size();
            CleaningSection section = sections.get(i);
            section.setResponsibleUser(users.get(i + collective.getCounter() % numberOfUsers));
            sectionRepository.save(section);
        }
        collective.setCounter(collective.getCounter() + 1);
        collectiveRepository.save(collective);
        return sections;
    }
}
