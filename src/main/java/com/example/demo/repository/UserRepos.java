package com.example.demo.repository;

import com.example.demo.domain.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepos extends JpaRepository<CustomUser, Long> {
    CustomUser findByUsername(@Param("username") String username);

    boolean existsByUsername(@Param("username") String username);
}
