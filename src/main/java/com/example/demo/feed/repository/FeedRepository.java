package com.example.demo.feed.repository;

import com.example.demo.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedRepository extends JpaRepository <Feed, Long> {

}
