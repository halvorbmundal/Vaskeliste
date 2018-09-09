package com.example.guttavaskbackend.controllers;

import com.example.guttavaskbackend.objects.ApplicationUser;
import com.example.guttavaskbackend.objects.CleaningSection;
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
import java.util.List;


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

    @GetMapping("/getpendingrequests")
    public List<ApplicationUser> getPendingRequest(){
        ApplicationUser user = this.getUser();
        Assert.isTrue(user.isCollectiveAdmin(), "User is not the colletive admin");
        return usersRepository.findAllUsersInCollective(user.getCollective().getId());
    }

    @PutMapping("/removerequest/{userId}")
    public void removeRequest(@PathVariable long userId){
        ApplicationUser admin = this.getUser();
        Assert.isTrue(admin.isCollectiveAdmin(), "User is not the colletive admin");
        ApplicationUser user = usersRepository.findById(userId);
        Assert.isTrue(admin.getCollective().equals(user.getCollective()), "Not the same collective");
        user.setCollective(null);
        usersRepository.save(user);
    }

    @PutMapping("/acceptrequest/{userId}")
    public ApplicationUser acceptRequest(@PathVariable long userId){
        ApplicationUser user = usersRepository.findById(userId);
        this.removeRequest(userId);
        user.setCollective(this.getUser().getCollective());
        user.setAcceptedInCollective(true);
        return user;
    }

    protected ApplicationUser getUser(){
        return usersRepository.findByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    protected boolean isUserPartOfCollective(Collective collective){
        ApplicationUser user = this.getUser();
        Collective userCollective = user.getCollective();
        return userCollective.getName().equals(userCollective.getName()) && user.isAcceptedInCollective();
    }


}
