package com.example.demo.controllers;

import com.example.demo.domain.Message;
import com.example.demo.domain.Views;
import com.example.demo.repository.MessageRepos;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("message")
public class MessageController {
    private final MessageRepos messageRepos;

    @Autowired
    public MessageController(MessageRepos messageRepos) {
        this.messageRepos = messageRepos;
    }

    @GetMapping
    @JsonView(Views.IdName.class)
    public List<Message> list() {
        return messageRepos.findAll();
    }

    @GetMapping("{id}")
    @JsonView(Views.FullMessage.class)
    public Message getOne(@PathVariable("id") Message message) {
        return message;
    }

    @PostMapping
    public Message create(@RequestBody Message message) {
        message.setCreationDate(LocalDateTime.now());
        return messageRepos.save(message);
    }

    @PutMapping("{id}")
    public Message update(
            @PathVariable("id") Message messageFromDb,
            @RequestBody Message message
    ) {
        System.out.println(message);
        BeanUtils.copyProperties(message, messageFromDb, "id");
        return messageRepos.save(messageFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Message message) {
        messageRepos.delete(message);
    }

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Message message(Message message) {
        return message;
    }


}
