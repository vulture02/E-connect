package com.E_connect.E_connect.controller;

import com.E_connect.E_connect.model.Post;
import com.E_connect.E_connect.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Post>getPostById(@PathVariable String id){
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/user/{email}")
    public ResponseEntity<List<Post>> getPostsByUserEmail(@PathVariable String email) {
        return ResponseEntity.ok(postService.getPostsByUserEmail(email));
    }
    @PostMapping
    public ResponseEntity<Post>createPost(@RequestBody Post post){
        Post createdPost=postService.createPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable String id, @RequestBody Post post) {
        try {
            Post updatedPost = postService.updatePost(id, post);
            return ResponseEntity.ok(updatedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count/{email}")
    public ResponseEntity<Long> countPostsByUser(@PathVariable String email) {
        return ResponseEntity.ok(postService.countPostsByUser(email));
    }

}
