package com.example.demo.controllers;

import com.example.demo.Roles;
import com.example.demo.domain.CustomUser;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.OkHttp3ClientHttpRequestFactory;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

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

//    @GetMapping
//    public String loggin() {
//        return "templates/form-login.html";
//    }

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
