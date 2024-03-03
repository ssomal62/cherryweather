package com.example.demo.feed.controller;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.feed.dto.FeedListDTO;
import com.example.demo.feed.dto.FeedRequestDTO;
import com.example.demo.feed.dto.FeedUpdateDTO;
import com.example.demo.feed.entity.Feed;
import com.example.demo.feed.service.FeedServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/feed")
@RequiredArgsConstructor
public class FeedApiController {

    private final FeedServiceImpl feedService;

    /*단일 피드 불러오기*/
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("isAuthenticated() or isAnonymous()")
    public ResponseEntity<Map<String, Object>> findAll() {
        return feedService.findAll();
    }

    /* 피드 전체 목록 (공개, 비공개) */

    /*피드 저장*/
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<FeedListDTO> createFeed(@Valid @RequestBody FeedRequestDTO requestDTO) {
        FeedListDTO feedListDTO = feedService.saveFeed(requestDTO);
        return ResponseEntity.ok().body(feedListDTO);
    }

    /*피드 삭제*/
    @DeleteMapping("/{feedId}")
    @PreAuthorize("isAuthenticated()  or isAnonymous()")
    public ResponseEntity<Void> deleteFeed(@PathVariable Long feedId) {
        feedService.deleteFeed(feedId);
        return ResponseEntity.noContent().build(); // 성공적으로 삭제되면 HTTP 204 No Content 응답 반환
    }

    /*피드 수정*/
    @PatchMapping("/{feedId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FeedListDTO> updateFeed(@PathVariable Long feedId, @Valid @RequestBody FeedUpdateDTO requestDTO) {
        FeedListDTO updatedFeedListDTO = feedService.updateFeed(feedId, requestDTO);
        return ResponseEntity.ok().body(updatedFeedListDTO);
    }
}
