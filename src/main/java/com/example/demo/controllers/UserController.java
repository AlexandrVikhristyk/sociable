package com.example.demo.controllers;

import com.example.demo.Roles;
import com.example.demo.domain.CustomUser;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;

    private final UserService userService;

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

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
        System.out.println("Password!!!!!!!!! - " + passwordEncoder.encode(user.getHashPass()));
        userService.addUser(user.getUsername(), passwordEncoder.encode(user.getHashPass()), user.getEmail(), Roles.USER);
    }

    @PostMapping("/account")
    public String updateUser(@RequestParam String userName, @RequestParam String email){
        userService.updateUser(userName,email);
        return "templates/index.html";
    }

    @PostMapping("/login")
    public String login(@RequestBody CustomUser user){
        if(userService.loginOfUser(user)) {
            var userTemp = userService.findByUsername(user.getUsername());
            if(user.getHashPass().equals(user.getHashPass())) {
                return "templates/index.html";
            }
        }
        return "templates/index.html";
    }
}
