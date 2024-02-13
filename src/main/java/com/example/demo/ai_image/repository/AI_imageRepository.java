package com.example.demo.ai_image.repository;

import com.example.demo.ai_image.entity.AI_image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AI_imageRepository extends JpaRepository<AI_image, Long> {

}
