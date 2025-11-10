package com.E_connect.E_connect.controller;

import com.E_connect.E_connect.model.User;
import com.E_connect.E_connect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(
    origins = "http://localhost:5173",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
    allowedHeaders = "*",
    allowCredentials = "true"
)
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<User> createOrUpdateUser(@RequestBody User user) {
        try {
            User savedUser = userService.createOrUpdateUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PostMapping("/{email}/increment")
    public ResponseEntity<User> incrementContribution(@PathVariable String email) {
        try {
            User user = userService.incrementContribution(email);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{email}/contributions")
    public ResponseEntity<Integer> getContributionCount(@PathVariable String email) {
        return ResponseEntity.ok(userService.getContributionCount(email));
    }
}