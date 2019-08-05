package com.example.demo.controllers;

import com.example.demo.Roles;
import com.example.demo.services.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/registration")
    public String addNewUser(@RequestParam String username, @RequestParam String email,
                          @RequestParam String hashPass) {
        if(userService.addUser(username,hashPass,email, Roles.USER)) {
            return "templates/index.html";
        }
        else
            return "templates/index.html";
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
