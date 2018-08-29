package com.example.guttavaskbackend.controllers;

import com.example.guttavaskbackend.objects.ApplicationUser;
import com.example.guttavaskbackend.objects.CleaningSection;
import com.example.guttavaskbackend.repositories.CleaningSectionRepository;
import com.example.guttavaskbackend.repositories.CleaningTaskRepository;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;

@RestController
@RequestMapping("sections")
@Transactional
public class CleaningSectionController {

    private final CleaningSectionRepository sectionRepository;
    private final UserController userController;
    private final CleaningTaskRepository taskRepository;

    @Inject
    public CleaningSectionController(CleaningSectionRepository sectionRepository, UserController userController, CleaningTaskRepository taskRepository) {
        this.sectionRepository = sectionRepository;
        this.userController = userController;
        this.taskRepository = taskRepository;
    }

    @PostMapping(value = "/add")
    public CleaningSection addCleaningSection(@RequestBody CleaningSection cleaningSection){
        Assert.notNull(cleaningSection.name, "Seksjonen mangler navn");
        return sectionRepository.save(cleaningSection);
    }

    @PutMapping(value = "/give/{userName}/task/{sectionId}")
    public CleaningSection assignCleaningSectionToUser(@PathVariable String userName, @PathVariable long cleaningSectionId){
        CleaningSection cleaningSection = sectionRepository.findById(cleaningSectionId);
        cleaningSection.setName(userName);
        return sectionRepository.save(cleaningSection);
    }

    @PutMapping(value = "/unassign/{sectionId}")
    public CleaningSection unassignCleaningSection(@PathVariable long cleaningSectionId){
        CleaningSection cleaningSection = sectionRepository.findById(cleaningSectionId);
        cleaningSection.setName(null);
        return sectionRepository.save(cleaningSection);
    }

    @DeleteMapping(value = "/delete/{cleaningsectionId}")
    public void deleteCleaningSection(@PathVariable long sectionId){
        sectionRepository.deleteById(sectionId);
    }

    @GetMapping(value="getSections")
    public ArrayList<CleaningSection> getSections(){
        ApplicationUser user = userController.getUser();
        ArrayList<CleaningSection> sections = sectionRepository.findAllByCollective(user.getCollective());
        return sections;
    }
}
