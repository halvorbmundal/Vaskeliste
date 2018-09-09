package com.example.guttavaskbackend.repositories;


import com.example.guttavaskbackend.objects.ApplicationUser;
import com.example.guttavaskbackend.objects.CleaningSection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends CrudRepository<ApplicationUser, Long> {
    ApplicationUser findByUsername(String name);

    ApplicationUser findById(long id);

    @Query(value = "SELECT * FROM users u WHERE u.collective_id = ?1 AND u.is_accepted_in_collective = false", nativeQuery = true)
    List<ApplicationUser> findAllUsersInCollective(@Param("id") long id);

    @Query(value = "SELECT * FROM users u WHERE u.collective_id = ?1 AND u.is_accepted_in_collective = true", nativeQuery = true)
    List<ApplicationUser> findAllAcceptedUsersInCollective(@Param("id") long id);
}