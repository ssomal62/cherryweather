package com.example.demo.ai_image.repository;

import com.example.demo.account.entity.Account;
import com.example.demo.ai_image.entity.AI_image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AI_imageRepository extends JpaRepository<AI_image, Long> {


    //image_url이 특정 URL 과 일치하는 엔티티를 찾는 쿼리 메서드
    Optional<AI_image> findByImageURL(String imageURL);

    void deleteAllBybucketURL(String bucketURL);

    @Query("SELECT ai FROM AI_image ai WHERE ai.account.accountId = :accountId")
    List<AI_image> getSavedUrlByAccountId(Long accountId);
}
