package com.example.demo.domain;

import com.example.demo.Roles;
import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class CustomUser {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 2, max = 40)
    @Pattern(regexp = "[A-Za-z0-9_]+")
    private String username;

    @NotNull
    private String hashPass;

    @Pattern(regexp = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")
    private String email;

    @Enumerated(EnumType.STRING)
    private Roles role;

    @Column(updatable = false)
    private LocalDateTime lastVisit;

    public CustomUser() {
    }

    public CustomUser(String username, String hashPass, String email, Roles role) {
        this.username = username;
        this.hashPass = hashPass;
        this.email = email;
        this.role = role;
    }
}
