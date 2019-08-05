package com.example.demo.domain;

import com.example.demo.Roles;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class CustomUser {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String hashPass;
    private String email;
    @Enumerated(value = EnumType.STRING)
    private Roles role;
    @Column(updatable = false)
    private LocalDateTime lastVisit;
}
