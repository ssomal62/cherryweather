package com.example.demo.feed.repository;

import com.example.demo.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedRepository extends JpaRepository <Feed, Long> {
    List<Feed> findByIsPublicTrue();

    @Query("SELECT f FROM Feed f WHERE f.club.clubId = :clubId")
    List<Feed> findByClubId(@Param("clubId") Long clubId);
}
