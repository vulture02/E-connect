package com.E_connect.E_connect.controller;

import com.E_connect.E_connect.model.User;
import com.E_connect.E_connect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user")
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
