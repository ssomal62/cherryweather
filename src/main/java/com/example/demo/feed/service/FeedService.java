package com.example.demo.feed.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.feed.dto.FeedListDTO;
import com.example.demo.feed.dto.FeedRequestDTO;
import com.example.demo.feed.dto.FeedUpdateDTO;
import com.example.demo.feed.entity.Feed;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;
import java.util.Map;

public interface FeedService {
    ResponseEntity<Map<String, Object>> findAll();
    FeedListDTO saveFeed(FeedRequestDTO requestDTO);

    void deleteFeed(final @AuthenticationPrincipal AccountDetails accountDetails, Long feedId);

    Feed updateFeed(final @AuthenticationPrincipal AccountDetails accountDetails, FeedUpdateDTO requestDTO);

    FeedListDTO getFeedById(Long feedId);

    ResponseEntity<Map<String, Object>> findByIsPublicTrue();

    List<FeedListDTO> findByClubId(Long clubId);
}
