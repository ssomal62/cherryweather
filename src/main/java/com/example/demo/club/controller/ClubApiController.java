package com.example.demo.club.controller;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.club.dto.*;
import com.example.demo.club.entity.Club;
import com.example.demo.club.service.ClubService;
import com.example.demo.common.service.FileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clubs")
public class ClubApiController {

    private final ClubService clubService;
    private final FileService fileService;

    /**
     * 클럽 목록 전체
     * <p>accessToken이 존재하면 클럽 좋아요 정보를 추가로 담아 목록을 반환합니다.</p>
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("isAuthenticated() or isAnonymous()")
    //@PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ClubListDTO> findAll() {
        return ResponseEntity.ok()
                .body(clubService.findAll());
    }

    /**
     * 사용자의 좋아요 한 클럽 목록
     */
    @GetMapping("/liked")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("isAuthenticated() or isAnonymous()")
    public ResponseEntity<List<LikeWithClubList>> findClubLikesForCurrentUser() {
        return ResponseEntity.ok()
                .body(clubService.findClubLikesForCurrentUser());
    }

    /**
     * 클럽 생성
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Club> createClub(
            final @Valid @RequestBody CreateClubDTO requestDTO,
            final @AuthenticationPrincipal AccountDetails accountDetails
            ) {
        return ResponseEntity.ok().body(
                clubService.saveClub(requestDTO, accountDetails)
        );
    }

    /**
     * 클럽 이미지 파일 저장
     */
    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> createClubProfile(
            @RequestParam(value = "file") MultipartFile file) {
        fileService.uploadSingleFile(file,"club-profile");
        return ResponseEntity.ok().build();
    }

    /**
     * 클럽 수정
     */
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> updateClub(
           final @Valid @RequestBody UpdateClubDTO requestDTO,
           final @AuthenticationPrincipal AccountDetails accountDetails
    ) {
        clubService.updateClub(requestDTO, accountDetails);
        return ResponseEntity.ok().build();
    }

    /**
     * 클럽 상세조회
     */
    @GetMapping("/{clubId}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("isAuthenticated() or isAnonymous()")
    public ResponseEntity<ClubDetailDTO> findClub(@PathVariable(value="clubId") long clubId) {
        return ResponseEntity.ok().body(
                clubService.findDetail(clubId)
        );
    }

    /**
     * 클럽 삭제
     */
    @DeleteMapping("/{clubId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteClub(@PathVariable(value="clubId") long clubId) {
        clubService.deleteClub(clubId);
        return ResponseEntity.ok().build();
    }

}
