package com.example.demo.repository;

import com.example.demo.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepos extends JpaRepository<Message, Long> {
}