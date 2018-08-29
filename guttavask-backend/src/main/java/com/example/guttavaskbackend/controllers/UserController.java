package com.example.guttavaskbackend.controllers;

import com.example.guttavaskbackend.objects.ApplicationUser;
import com.example.guttavaskbackend.objects.Collective;
import com.example.guttavaskbackend.repositories.CollectiveRepository;
import com.example.guttavaskbackend.repositories.UsersRepository;
import com.example.guttavaskbackend.utility.IllegalInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.ws.rs.NotFoundException;


@RestController
@RequestMapping("user")
@Transactional
public class UserController {

    private UsersRepository usersRepository;
    private CollectiveRepository collectiveRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserController(UsersRepository usersRepository, BCryptPasswordEncoder bCryptPasswordEncoder, CollectiveRepository collectiveRepository) {
        this.usersRepository = usersRepository;
        this.collectiveRepository = collectiveRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody ApplicationUser user) {
        if (usersRepository.findByUsername(user.getUsername()) == null) {
            Assert.notNull(user.getUsername(), "No username");
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setAcceptedInCollective(false);
            user.setCollectiveAdmin(false);
            usersRepository.save(user);
        }
        else{
            throw new IllegalInputException("Username already exists");
        }
    }

    @PutMapping("/addusertocollective")
    public ApplicationUser addUserToCollective(@RequestBody Collective collectiveName) {
        ApplicationUser user = this.getUser();
        Collective collective = collectiveRepository.findByName(collectiveName.getName());
        if (collective == null){
            throw new IllegalInputException("Could not find collective " + collectiveName.getName());
        }
        user.setCollective(collective);
        return usersRepository.save(user);
    }

    @DeleteMapping(value = "/delete")
    public void deleteUser(@RequestBody long userId){
        usersRepository.deleteById(userId);
    }

    @GetMapping("/isloggedin")
    public boolean isLoggedIn(){
        return true;
    }

    @GetMapping("/getuser")
    public ApplicationUser getCollective(){
        ApplicationUser user = this.getUser();
        return user;
    }

    protected ApplicationUser getUser(){
        return usersRepository.findByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }
}
