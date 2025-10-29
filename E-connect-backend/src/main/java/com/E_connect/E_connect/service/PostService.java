package com.E_connect.E_connect.service;

import com.E_connect.E_connect.model.Post;
import com.E_connect.E_connect.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post>getAllPosts(){
        return postRepository.findAll();

    }
    public Optional<Post>getPostById(String id){
        return postRepository.findById(id);

    }
    public List<Post> getPostsByUserEmail(String userEmail){
        return postRepository.findByUserEmail(userEmail);
    }
    public List<Post> getPostsByCategory(String category){
        return postRepository.findByCategory(category);
    }
    public Post createPost(Post post){
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }
    public Post updatePost(String id, Post updatedPost) {
        return postRepository.findById(id)
                .map(post -> {
                    post.setTitle(updatedPost.getTitle());
                    post.setDescription(updatedPost.getDescription());
                    post.setCategory(updatedPost.getCategory());
                    post.setLocation(updatedPost.getLocation());
                    return postRepository.save(post);
                })
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }
    public void deletePost(String id){
        postRepository.deleteById(id);
    }
    public long countPostsByUser(String userEmail) {
        return postRepository.findByUserEmail(userEmail).size();
    }
}
