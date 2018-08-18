package com.example.guttavaskbackend.controllers;

import com.example.guttavaskbackend.objects.CleaningSection;
import com.example.guttavaskbackend.repositories.CleaningSectionRepository;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.transaction.Transactional;

@RestController
@RequestMapping("section")
@Transactional
public class CleaningSectionController {

    private final CleaningSectionRepository sectionRepository;

    @Inject
    public CleaningSectionController(CleaningSectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    @PostMapping(value = "/add")
    public CleaningSection addCleaningSection(@RequestBody CleaningSection cleaningSection){
        Assert.notNull(cleaningSection.name, "Seksjonen mangler navn");
        return sectionRepository.save(cleaningSection);
    }

    @PutMapping(value = "/give/{userName}/task/{sectionId}")
    public CleaningSection assignCleaningSectionToUser(@PathVariable String userName, @PathVariable long cleaningSectionId){
        CleaningSection cleaningSection = sectionRepository.findCleaningSectionById(cleaningSectionId);
        cleaningSection.setName(userName);
        return sectionRepository.save(cleaningSection);
    }

    @PutMapping(value = "/unassign/{sectionId}")
    public CleaningSection unassignCleaningSection(@PathVariable long cleaningSectionId){
        CleaningSection cleaningSection = sectionRepository.findCleaningSectionById(cleaningSectionId);
        cleaningSection.setName(null);
        return sectionRepository.save(cleaningSection);
    }

    @DeleteMapping(value = "/delete/{cleaningsectionId}")
    public void deleteCleaningSection(@PathVariable long sectionId){
        sectionRepository.deleteById(sectionId);
    }
}
