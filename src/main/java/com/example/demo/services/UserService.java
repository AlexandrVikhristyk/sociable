package com.example.demo.services;

import com.example.demo.Roles;
import com.example.demo.domain.CustomUser;
import com.example.demo.repository.UserRepos;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Objects;
import java.util.UUID;

@Service
public class UserService {
    private final MailService mailService;
    private final UserRepos userRepos;

    public UserService(MailService mailService, UserRepos userRepos) {
        this.mailService = mailService;
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
        user.setActivationCode(UUID.randomUUID().toString());
        if (!StringUtils.isEmpty(user.getEmail())){
            String message = String.format(
              "Hello, %s! \n" +
                      "Welcome to Sociable. Please, visit next link: http://localhost:8080/user/activate/%s",
                    user.getUsername(),
                    user.getActivationCode()
            );
            mailService.send(user.getEmail(), "Activation code", message);
        }

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

    public boolean activateUser(String code) {
        CustomUser user = userRepos.findByActivationCode(code);
        if (Objects.isNull(user))
            return false;
        user.setActivationCode(null);

        userRepos.save(user);
        return true;
    }
}
