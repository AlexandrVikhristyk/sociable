package com.example.demo.services;

import com.example.demo.Roles;
import com.example.demo.domain.CustomUser;
import com.example.demo.repository.UserRepos;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepos userRepos;

    public UserService(UserRepos userRepos) {
        this.userRepos = userRepos;
    }

    @Transactional(readOnly = true)
    public CustomUser findByUsername(String username){
        return userRepos.findByUsername(username);
    }

    @Transactional
    public boolean addUser(String username, String passHash, String email, Roles role){
        if (userRepos.existsByUsername(username))
            return false;
        CustomUser user = new CustomUser(username, passHash, email, role);
        userRepos.save(user);
        return true;
    }

    @Transactional
    public void updateUser(String username, String email){
        CustomUser userFromDb = userRepos.findByUsername(username);
        if(!userFromDb.getEmail().equals(email)) {
            userFromDb.setEmail(email);
        }
        if(!userFromDb.getUsername().equals(username)) {
            userFromDb.setUsername(username);
        }
        userRepos.save(userFromDb);
    }

    @Transactional
    public boolean loginOfUser(CustomUser user) {
        if(userRepos.existsByUsername(user.getUsername())) {
            CustomUser userTemp = userRepos.findByUsername(user.getUsername());
            if(userTemp.getUsername().equals(user.getUsername()) && userTemp.getHashPass().equals(user.getHashPass())) {
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }
}
