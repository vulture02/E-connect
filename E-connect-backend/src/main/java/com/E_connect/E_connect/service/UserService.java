package com.E_connect.E_connect.service;

import com.E_connect.E_connect.model.User;
import com.E_connect.E_connect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User>getAllUsers(){
        return userRepository.findAll();
    }
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public User createOrUpdateUser(User user){
        Optional<User>existingUser=userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()){
            User existing=existingUser.get();
            existing.setDisplayName(user.getDisplayName());
            existing.setPhotoURL(user.getPhotoURL());
            return userRepository.save(existing);
        }
        else {
            user.setCreatedAt(LocalDateTime.now());
            user.setContributionCount(0);
            return userRepository.save(user);
        }
    }
    public User incrementContribution(String email){
        return userRepository.findByEmail(email)
                .map(user -> {
                    user.setContributionCount(user.getContributionCount() + 1);
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
    public int getContributionCount(String email) {
        return userRepository.findByEmail(email)
                .map(User::getContributionCount)
                .orElse(0);
    }

}
