package com.example.demo.controllers;

import com.example.demo.Roles;
import com.example.demo.domain.CustomUser;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ValidController {
    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserService userService;

    public ValidController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/reg")
    public void addNewUser(@RequestBody CustomUser user) {
        System.out.println("User name - " + user.getUsername());
        System.out.println("Email - " + user.getEmail());
        System.out.println("Role - " + user.getRole());
        System.out.println("Id - " + user.getId());
        System.out.println("Password - " + user.getHashPass());
        userService.addUser(user.getUsername(), passwordEncoder.encode(user.getHashPass()), user.getEmail(), Roles.USER);
    }

    @PostMapping("/log")
    public void log(@RequestBody CustomUser user){
        var a = userService.findByUsername(user.getUsername());
        System.out.println("!!!!!!!!!!!!!!!!!!!!" + a.getHashPass());
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + user.getHashPass());
        userService.loginOfUser(user.getUsername(),user.getHashPass());
    }
}
