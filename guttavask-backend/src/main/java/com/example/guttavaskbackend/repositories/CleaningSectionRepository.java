package com.example.guttavaskbackend.repositories;

import com.example.guttavaskbackend.objects.CleaningSection;
import org.springframework.data.repository.CrudRepository;

public interface CleaningSectionRepository extends CrudRepository<CleaningSection, Long> {
    CleaningSection findCleaningSectionById(long id);
}
