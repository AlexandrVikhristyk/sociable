package com.example.demo.repository;

import com.example.demo.domain.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepos extends JpaRepository<CustomUser, Long> {
    public CustomUser findByUsername(@Param("username") String username);
}
