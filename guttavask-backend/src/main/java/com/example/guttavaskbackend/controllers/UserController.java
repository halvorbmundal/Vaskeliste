package com.example.guttavaskbackend.controllers;

import com.example.guttavaskbackend.objects.ApplicationUser;
import com.example.guttavaskbackend.objects.Collective;
import com.example.guttavaskbackend.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;


@RestController
@RequestMapping("user")
@Transactional
public class UserController {

    private UsersRepository usersRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserController(UsersRepository usersRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.usersRepository = usersRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody ApplicationUser user) {
        if (usersRepository.findByUsername(user.getUsername()) == null) {
            Assert.notNull(user.getUsername(), "ingen brukernavn");
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            usersRepository.save(user);
        }
        else{
            throw new IllegalArgumentException("Brukernavn eksisterer allerede");
        }
    }

    @PostMapping("/addusertocollective")
    public ApplicationUser addUserToCollective(@RequestBody ApplicationUser user) {
        ApplicationUser userInDatabase = usersRepository.findByUsername(user.getUsername());
        userInDatabase.setCollective(this.getUser().getCollective());
        return usersRepository.save(userInDatabase);
    }

    @DeleteMapping(value = "/delete")
    public void deleteUser(@RequestBody long userId){
        usersRepository.deleteById(userId);
    }

    @GetMapping("/test")
    public ApplicationUser test(){
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return usersRepository.findByUsername("Halvor");
    }

    @GetMapping("/collective")
    public Collective getCollective(){
        ApplicationUser user = this.getUser();
        return user.getCollective();
    }

    protected ApplicationUser getUser(){
        return usersRepository.findByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }
}
