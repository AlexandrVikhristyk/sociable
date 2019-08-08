package com.example.demo.services;

import com.example.demo.Roles;
import com.example.demo.domain.CustomUser;
import com.example.demo.repository.UserRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    private final UserRepos userRepos;
    private final MailService mailService;

    public UserService(UserRepos userRepos, MailService mailService) {
        this.userRepos = userRepos;
        this.mailService = mailService;
    }

    @Transactional(readOnly = true)
    public CustomUser findByUsername(String username){
        return userRepos.findByUsername(username);
    }

    @Transactional
    public boolean addUser(String username, @NotNull String passHash, String email, Roles role){
        if (userRepos.existsByUsername(username)
                && !passHash.matches("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,16}")
                && !username.matches("^[a-zA-Z][a-zA-Z0-9-_\\.]{2,20}$"))
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
    public boolean loginOfUser(String login, String password) {
        if(userRepos.existsByUsername(login)) {
            CustomUser userTemp = userRepos.findByUsername(login);
            if(userTemp.getUsername().equals(login) && passwordEncoder.matches(password, userTemp.getHashPass())) {
                return true;
            }
        }
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
