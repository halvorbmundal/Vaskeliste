package com.example.guttavaskbackend.repositories;


import com.example.guttavaskbackend.objects.Collective;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectiveRepository extends CrudRepository<Collective, Long>{
}
