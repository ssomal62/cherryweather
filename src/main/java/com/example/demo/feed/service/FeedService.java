package com.example.demo.feed.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.feed.dto.FeedListDTO;
import com.example.demo.feed.dto.FeedRequestDTO;
import com.example.demo.feed.dto.FeedUpdateDTO;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface FeedService {
    ResponseEntity<Map<String, Object>> findAll();
    FeedListDTO saveFeed(FeedRequestDTO requestDTO);

    void deleteFeed(Long feedId);

    FeedListDTO updateFeed(Long feedId, FeedUpdateDTO requestDTO);
}
