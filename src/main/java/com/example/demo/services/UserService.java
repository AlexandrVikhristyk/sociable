package com.example.demo.services;

import com.example.demo.domain.CustomUser;
import com.example.demo.repository.UserRepos;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepos userRepos;

    public UserService(UserRepos userRepos) {
        this.userRepos = userRepos;
    }

    public CustomUser findByUsername(String username){
        return userRepos.findByUsername(username);
    }
}
