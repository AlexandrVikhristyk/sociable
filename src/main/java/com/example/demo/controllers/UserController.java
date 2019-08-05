package com.example.demo.controllers;

import com.example.demo.Roles;
import com.example.demo.domain.CustomUser;
import com.example.demo.services.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/registration")
    public String addNew(){
        return "templates/index.html";
    }

    @PostMapping("/registration")
    public void addNewUser(@RequestBody CustomUser user) {
        System.out.println("User name - " + user.getUsername());
        System.out.println("Email - " + user.getEmail());
        System.out.println("Role - " + user.getRole());
        System.out.println("Id - " + user.getId());
        System.out.println("Password - " + user.getHashPass());
        userService.addUser(user.getUsername(), user.getHashPass(), user.getEmail(), Roles.USER);
    }

    @PostMapping("/account")
    public String updateUser(@RequestParam String userName, @RequestParam String email){
        userService.updateUser(userName,email);
        return "templates/index.html";
    }

    @PostMapping("/login")
    public String login(@RequestParam String userName, @RequestParam String hashPass){
        if(userService.loginOfUser(userName,hashPass)) {
            var user = userService.findByUsername(userName);
            if(user.getHashPass().equals(hashPass)) {
                return "templates/index.html";
            }
        }
        return "templates/index.html";
    }
}
