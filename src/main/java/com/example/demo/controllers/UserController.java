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

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/account")
    public String updateUser(@RequestParam String userName, @RequestParam String email){
        userService.updateUser(userName,email);
        return "templates/index.html";
    }

    @GetMapping("/activate/{code}")
    public String activate(@PathVariable String code){
        boolean isActived = userService.activateUser(code);
        System.out.println("TEST TEST TEST TEST TEST");
        if (isActived)
            System.out.println("NICE");
        else
            System.out.println("FUCK IT");

        return "templates/index.html";
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }
}
