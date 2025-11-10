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
@Document(collection = "posts")
public class Post {

    @Id
    private String id;
    private String title;
    private String description;
    private String category;
    private String userEmail;
    private String location;
    private LocalDateTime createdAt;

    public Post(String title, String description, String category, String userEmail, String location) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.userEmail = userEmail;
        this.location = location;
        this.createdAt = LocalDateTime.now();
    }
}
