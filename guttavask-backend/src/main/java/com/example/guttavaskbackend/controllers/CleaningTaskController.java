package com.example.guttavaskbackend.controllers;

import com.example.guttavaskbackend.objects.CleaningTask;
import com.example.guttavaskbackend.repositories.CleaningSectionRepository;
import com.example.guttavaskbackend.repositories.CleaningTaskRepository;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping("task")
@Transactional
public class CleaningTaskController {

    private final CleaningTaskRepository taskRepository;
    private final CleaningSectionRepository sectionRepository;

    public CleaningTaskController(CleaningTaskRepository taskRepository, CleaningSectionRepository sectionRepository) {
        this.taskRepository = taskRepository;
        this.sectionRepository = sectionRepository;
    }


    @PostMapping(value = "/addtosection/{sectionId}")
    public CleaningTask addTaskToSection(@RequestBody CleaningTask task, @PathVariable long sectionId){
        Assert.notNull(task.name, "Oppgaven mangler navn");
        task.setSection(sectionRepository.findCleaningSectionById(sectionId));
        return taskRepository.save(task);
    }

    @DeleteMapping(value = "/delete/{taskId}")
    public void deleteCleaningSection(@PathVariable long taskId){
        taskRepository.deleteById(taskId);
    }

    @PutMapping(value="/completetask/{taskId}")
    public boolean updateTaskCompletion(@PathVariable long taskId){
        CleaningTask task = taskRepository.findCleaningTaskById(taskId);
        task.setComplete(!task.isComplete);
        taskRepository.save(task);
        return task.isComplete;
    }
}
