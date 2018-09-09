package com.example.guttavaskbackend.repositories;

import com.example.guttavaskbackend.objects.CleaningSection;
import com.example.guttavaskbackend.objects.Collective;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface CleaningSectionRepository extends CrudRepository<CleaningSection, Long> {
    ArrayList<CleaningSection> findAllByCollective(Collective collective);

    CleaningSection findById(long id);


}
