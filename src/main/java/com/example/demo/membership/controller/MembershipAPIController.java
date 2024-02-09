package com.example.demo.membership.controller;


import com.example.demo.membership.dto.ClubSignupDTO;
import com.example.demo.membership.dto.MembershipListDTO;
import com.example.demo.membership.dto.UpdateMembership;
import com.example.demo.membership.dto.UserInfo;
import com.example.demo.membership.service.MembershipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/membership")
public class MembershipAPIController {

    private final MembershipService membershipService;

    /**
     * 멤버십 삭제 - 전체
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MembershipListDTO> findAllMembership() {

        return ResponseEntity.ok().body(
                membershipService.findAllMembership()
        );
    }

    /**
     * 멤버십 조회 - email
     */
    @GetMapping("/user-info")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MembershipListDTO> findAllMembershipByAccountId(
            @RequestBody UserInfo userInfo
            ) {
        return ResponseEntity.ok().body(
                membershipService.findAllMembershipByAccountId(userInfo)
        );
    }

    /**
     * 멤버십 등록 (클럽 가입)
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> singUpMembership(
            @Valid @RequestBody ClubSignupDTO requestDTO
    ) {
        membershipService.saveMembership(requestDTO);
        return ResponseEntity.ok().build();
    }

    /**
     * 멤버십 수정
     */
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> updateMembership(
            @Valid @RequestBody UpdateMembership requestDTO
            ) {
        membershipService.updateMembership(requestDTO);
        return ResponseEntity.ok().build();
    }

    /**
     * 멤버십 삭제
     */
    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteMembership(
            @Valid @RequestBody UpdateMembership requestDTO
    ) {
        membershipService.deleteMembership(requestDTO);
        return ResponseEntity.ok().build();
    }
}