package com.example.demo.club.controller;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.club.dto.ClubDetailDTO;
import com.example.demo.club.dto.ClubListDTO;
import com.example.demo.club.dto.CreateClubDTO;
import com.example.demo.club.dto.UpdateClubDTO;
import com.example.demo.club.service.ClubService;
import com.example.demo.common.service.FileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clubs")
public class ClubApiController {

    private final ClubService clubService;
    private final FileService fileService;

    /**
     * 클럽 목록 전체 조회 (필터 없음)
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    //@PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ClubListDTO> findAllClubs() {
        return ResponseEntity.ok()
                .body(clubService.findAll());
    }

    /**
     * 클럽 생성
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> createClub(
            final @Valid @RequestBody CreateClubDTO requestDTO,
            final @AuthenticationPrincipal AccountDetails accountDetails
            ) {
        clubService.saveClub(requestDTO, accountDetails);
        return ResponseEntity.ok().build();
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
