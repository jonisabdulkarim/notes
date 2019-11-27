package com.camper.demo;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class IndexController {

    private final AtomicLong counter = new AtomicLong();
    private static final String template = "Welcome back, %s!%n";

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/")
    public Index index(@RequestParam(value="name") String name) {
        long id = counter.incrementAndGet();
        String content = String.format(template, name);
        
        return new Index(id, content);
    }
}
