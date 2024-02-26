package com.example.demo.like.controller;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.like.dto.LikeInfo;
import com.example.demo.like.dto.LikeList;
import com.example.demo.like.dto.LikeListGroupByType;
import com.example.demo.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    /**
     * 사용자의 좋아요 상태를 토글. 이미 좋아요를 한 상태라면 제거, 아니면 추가.
     */
    @PostMapping
    public ResponseEntity<Void> toggleLike(
            final @AuthenticationPrincipal AccountDetails accountDetails,
            final @RequestBody LikeInfo infoDto
    ) {
        likeService.toggleLike(accountDetails, infoDto);
        return ResponseEntity.ok().build();
    }

    /**
     * 특정 유형에 대한 모든 좋아요 항목을 조회
     */
    @GetMapping("/{type}")
    public ResponseEntity<LikeList> findAllType(
            final @AuthenticationPrincipal AccountDetails accountDetails,
            final @PathVariable(value ="type") String type
    ) {
        return ResponseEntity.ok().body(
                likeService.findAllByLikeType(accountDetails, type)
        );
    }

    /**
     * 사용자별 좋아요 항목을 유형에 따라 그룹화하여 조회
     */
    @GetMapping
    public ResponseEntity<LikeListGroupByType> findAllType(
            final @AuthenticationPrincipal AccountDetails accountDetails
    ) {
        return ResponseEntity.ok().body(
                likeService.findAllTypeGroupedByLikeType(accountDetails)
        );
    }
}
