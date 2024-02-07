package com.example.demo.club.controller;


import com.example.demo.club.dto.ClubDetailDTO;
import com.example.demo.club.dto.ClubListDTO;
import com.example.demo.club.dto.CreateClubDTO;
import com.example.demo.club.dto.UpdateClubDTO;
import com.example.demo.club.service.ClubService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clubs")
public class ClubAPIController {

    private final ClubService clubService;

    /**
     * 클럽 목록 전체 조회 (필터 없음)
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
   //@PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ClubListDTO> getAllClubs() {
        return ResponseEntity.ok()
                .body(clubService.findAll());
    }

    /**
     * 클럽 생성
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> createClub(@Valid @RequestBody CreateClubDTO requestDTO) {
        clubService.saveClub(requestDTO);
        return ResponseEntity.ok().build();
    }

    /**
     * 클럽 수정
     */
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> updateClub(@Valid @RequestBody UpdateClubDTO requestDTO) {
        clubService.updateClub(requestDTO);
        return ResponseEntity.ok().build();
    }

    /**
     * 클럽 상세조회
     */
    @GetMapping("/{clubId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ClubDetailDTO> getClub(@PathVariable(value="clubId") long clubId) {
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
