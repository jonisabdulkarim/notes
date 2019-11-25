package com.camper.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final AccountRepository repository;

    @Autowired
    public DatabaseLoader(AccountRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Account("Adam"));
        this.repository.save(new Account("Barbara"));
        this.repository.save(new Account("Charlie"));
        this.repository.save(new Account("Dominique"));
        this.repository.save(new Account("Eric"));
        this.repository.save(new Account("Felicia"));
    }
}