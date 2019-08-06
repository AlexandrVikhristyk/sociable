package com.example.demo.services;

import com.example.demo.Roles;
import com.example.demo.domain.CustomUser;
import com.example.demo.repository.UserRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;

@Service
public class UserService {
    private final UserRepos userRepos;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepos userRepos) {
        this.userRepos = userRepos;
    }

    @Transactional(readOnly = true)
    public CustomUser findByUsername(String username){
        return userRepos.findByUsername(username);
    }

    @Transactional
    public boolean addUser(String username, String passHash, String email, Roles role){
        if (userRepos.existsByUsername(username) && !passHash.matches("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,16}"))
            return false;
        CustomUser user = new CustomUser(username, passwordEncoder.encode(passHash), email, role);
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
    public boolean loginOfUser(String username, String passHash) {
        if(userRepos.existsByUsername(username)) {
            CustomUser userTemp = userRepos.findByUsername(username);
            if(userTemp.getUsername().equals(username) && userTemp.getHashPass().equals(passHash)) {
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }
}
