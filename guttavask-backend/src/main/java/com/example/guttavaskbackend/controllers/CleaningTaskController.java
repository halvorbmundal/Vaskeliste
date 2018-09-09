package com.example.guttavaskbackend.controllers;

import com.example.guttavaskbackend.objects.CleaningSection;
import com.example.guttavaskbackend.objects.CleaningTask;
import com.example.guttavaskbackend.repositories.CleaningSectionRepository;
import com.example.guttavaskbackend.repositories.CleaningTaskRepository;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping("tasks")
@Transactional
public class CleaningTaskController {

    private final CleaningTaskRepository taskRepository;
    private final UserController userController;
    private final CleaningSectionRepository sectionRepository;

    public CleaningTaskController(CleaningTaskRepository taskRepository, UserController userController, CleaningSectionRepository sectionRepository) {
        this.taskRepository = taskRepository;
        this.userController = userController;
        this.sectionRepository = sectionRepository;
    }


    @PostMapping(value = "/addtosection/{sectionId}")
    public CleaningTask addTaskToSection(@RequestBody CleaningTask task, @PathVariable long sectionId){
        Assert.notNull(task.getName(), "Oppgaven mangler navn");
        CleaningSection section = sectionRepository.findById(sectionId);
        Assert.isTrue(userController.isUserPartOfCollective(section.getCollective()), "User is not a part of the collective");
        task.setSection(section);
        return taskRepository.save(task);
    }

    @DeleteMapping(value = "/delete/{taskId}")
    public void deleteCleaningSection(@PathVariable long taskId){
        Assert.isTrue(userController.isUserPartOfCollective(taskRepository.findById(taskId).getSection().getCollective()), "User is not a part of the collective");
        taskRepository.deleteById(taskId);
    }

    @PutMapping(value="/updatetaskcompletion/{taskId}")
    public boolean updateTaskCompletion(@RequestBody CleaningTask taskData, @PathVariable long taskId){
        Assert.isTrue(userController.isUserPartOfCollective(taskRepository.findById(taskId).getSection().getCollective()), "User is not a part of the collective");
        CleaningTask task = taskRepository.findById(taskId);
        task.setComplete(!taskData.isComplete);
        taskRepository.save(task);
        return task.isComplete;
    }
}
