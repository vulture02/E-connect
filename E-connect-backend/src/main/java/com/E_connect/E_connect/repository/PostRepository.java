package com.E_connect.E_connect.repository;

import com.E_connect.E_connect.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post,String>{

    List<Post> findByUserEmail(String userEmail);

    List<Post> findByCategory(String category);

    List<Post> findByLocation(String location);
}
