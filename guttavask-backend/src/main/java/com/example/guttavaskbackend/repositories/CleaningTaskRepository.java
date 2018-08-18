package com.example.guttavaskbackend.repositories;

import com.example.guttavaskbackend.objects.CleaningTask;
import org.springframework.data.repository.CrudRepository;

public interface CleaningTaskRepository extends CrudRepository<CleaningTask, Long> {
    CleaningTask findCleaningTaskById(long id);
}
