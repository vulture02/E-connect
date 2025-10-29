package com.E_connect.E_connect.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String displayName;
    private String photoURL;
    private LocalDateTime createdAt;
    private int contributionCount;

    public User(String email, String displayName) {
        this.email = email;
        this.displayName = displayName;
        this.createdAt = LocalDateTime.now();
        this.contributionCount = 0;
    }

}
