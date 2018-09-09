package com.example.guttavaskbackend.repositories;


import com.example.guttavaskbackend.objects.ApplicationUser;
import com.example.guttavaskbackend.objects.CleaningSection;
import com.example.guttavaskbackend.objects.Collective;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectiveRepository extends CrudRepository<Collective, Long>{
    Collective findByName(String name);

    Collective findById(long id);

    @Query(value = "SELECT * FROM cleaning_sections c WHERE c.collective_id = ?1", nativeQuery = true)
    List<CleaningSection> findAllSectionsInCollective(@Param("id") long id);
}
