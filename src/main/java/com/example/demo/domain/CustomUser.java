package com.example.demo.domain;

import com.example.demo.Roles;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class CustomUser {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String username;
    private String hashPass;
    @NotNull
    @Email
    private String email;
    private String activationCode;
    @Enumerated(EnumType.STRING)
    private Roles role;
    @Column(updatable = false)
    private LocalDateTime lastVisit;

    public CustomUser(String username, String hashPass, String email, Roles role) {
        this.username = username;
        this.hashPass = hashPass;
        this.email = email;
        this.role = role;
    }
}
