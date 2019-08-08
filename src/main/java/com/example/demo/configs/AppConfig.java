package com.example.demo.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/testSocket").setViewName("index.html");
        registry.addViewController("/").setViewName("templates/index.html");
        registry.addViewController("/registration").setViewName("templates/form-registration.html");
    }
}
