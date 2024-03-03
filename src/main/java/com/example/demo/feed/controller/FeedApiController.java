package com.example.demo.feed.controller;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.feed.dto.FeedDTO;
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
@RequestMapping("/api/feeds")
@RequiredArgsConstructor
public class FeedApiController {

    private final FeedServiceImpl feedService;

    // =================== 불러오기 ================== //
    /*단일 피드 불러오기*/
    @GetMapping("/{feedId}")
    @PreAuthorize("isAuthenticated() or isAnonymous()")
    public ResponseEntity<FeedListDTO> getFeedById(@PathVariable Long feedId) {
        FeedListDTO feedListDTO = feedService.getFeedById(feedId);
        return ResponseEntity.ok(feedListDTO);
    }

    /* 피드 전체 목록 (공개만) */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("isAuthenticated() or isAnonymous()")
    public ResponseEntity<Map<String, Object>> findByIsPublicTrue() {
        System.out.println(" 호출 성공 ");
        return feedService.findByIsPublicTrue();
    }

    /* 피드 전체 목록 (비공개 포함) */
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("isAuthenticated() or isAnonymous()")
    public ResponseEntity<Map<String, Object>> findAll() {
        return feedService.findAll();
    }

    /* 클럽 ID에 해당하는 모든 피드 불러오기 */
    @GetMapping("/club/{clubId}")
    @PreAuthorize("isAuthenticated() or isAnonymous()")
    public ResponseEntity<List<FeedListDTO>> findByClubId(@PathVariable Long clubId) {
        List<FeedListDTO> feedListDTOs = feedService.findByClubId(clubId);
        return ResponseEntity.ok(feedListDTOs);
    }


    /*피드 저장*/
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<FeedListDTO> createFeed(final @AuthenticationPrincipal AccountDetails accountDetails, @Valid @RequestBody FeedRequestDTO requestDTO) {
        FeedRequestDTO saveDTO = feedService.setUserInfo(requestDTO,accountDetails);
        System.out.println("saveDTO = " + saveDTO);
        FeedListDTO feedListDTO = feedService.saveFeed(saveDTO);
        return ResponseEntity.ok().body(feedListDTO);
    }

    /*피드 삭제*/
    @DeleteMapping("/{feedId}")
    @PreAuthorize("isAuthenticated()  or isAnonymous()")
    public ResponseEntity<Void> deleteFeed(final @AuthenticationPrincipal AccountDetails accountDetails, @PathVariable Long feedId) {
        feedService.deleteFeed(accountDetails,feedId);
        return ResponseEntity.noContent().build(); // 성공적으로 삭제되면 HTTP 204 No Content 응답 반환
    }

    /*피드 수정*/
    @PatchMapping
    @PreAuthorize("isAuthenticated() or isAnonymous()")
    public ResponseEntity<Feed> updateFeed(final @AuthenticationPrincipal AccountDetails accountDetails, @Valid @RequestBody FeedUpdateDTO requestDTO) {
        Feed updatedFeedListDTO = feedService.updateFeed(accountDetails,requestDTO);
        return ResponseEntity.ok().body(updatedFeedListDTO);
    }
}
