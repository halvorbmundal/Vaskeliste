package com.example.guttavaskbackend.repositories;


import com.example.guttavaskbackend.objects.ApplicationUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends CrudRepository<ApplicationUser, Long> {
    ApplicationUser findByUsername(String name);
}