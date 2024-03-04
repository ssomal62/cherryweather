package com.example.demo.membership.controller;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.membership.dto.*;
import com.example.demo.membership.service.MembershipQueryService;
import com.example.demo.membership.service.MembershipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/membership")
public class MembershipApiController {

    private final MembershipService membershipService;
    private final MembershipQueryService membershipQueryService;

    /**
     * 모든 멤버십 조회
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MembershipListDTO> findAllMembership() {
        return ResponseEntity.ok().body(
                membershipService.findAllMembership()
        );
    }

    /**
     * 개인 멤버십 목록 조회
     */
    @GetMapping("/my-memberships")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MembershipListDTO> findAllMembershipsByAccount(
            final @AuthenticationPrincipal AccountDetails accountDetails
    ) {
        return ResponseEntity.ok().body(
                membershipService.findAllByAccount(accountDetails)
        );
    }

    /**
     * 멤버십 조회 - 현재 클럽 특정 멤버
     */
    @GetMapping("/{clubId}/member")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MembershipInfo> checkMember(
            final @PathVariable(value = "clubId") long clubId,
            final @AuthenticationPrincipal AccountDetails accountDetails
    ) {
        return ResponseEntity.ok().body(
                membershipService.findMembership(clubId, accountDetails)
        );
    }

    /**
     * 멤버십 목록 조회 - 현재 클럽 모든 멤버
     */
    @GetMapping("/{clubId}/memberships")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MembershipListDTO> currentClubMembershipInfoS(
            @PathVariable(value = "clubId") long clubId) {
        return ResponseEntity.ok().body(
                membershipService.findAllByClub(clubId)
        );
    }

    /**
     * 멤버십 조회 - 쿼리
     */
    @PostMapping("/query")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MembershipListDTO> findAllMembershipsByQueries(
            @RequestBody MembershipQueryDTO membershipQueryDTO
    ) {
        return ResponseEntity.ok().body(
                membershipQueryService.findAllByConditions(membershipQueryDTO)
        );
    }

    /**
     * 멤버십 등록 (클럽 가입)
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    //@PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> singUpMembership(
            final @Valid @RequestBody ClubSignupDTO requestDTO,
            final @AuthenticationPrincipal AccountDetails accountDetails
            ) {
        membershipService.saveMembership(requestDTO, accountDetails);
        return ResponseEntity.ok().build();
    }

    /**
     * 멤버십 수정
     */
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> updateMembership(
            final @Valid @RequestBody UpdateMembership requestDTO,
            final @AuthenticationPrincipal AccountDetails accountDetails

    ) {
        membershipService.updateMembership(requestDTO, accountDetails);
        return ResponseEntity.ok().build();
    }

    /**
     * 멤버십 삭제
     */
    @DeleteMapping("/{clubId}/{membershipId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteMembership(
            final @PathVariable(value = "membershipId") long membershipId,
            final @PathVariable(value = "clubId") long clubId
    ) {
        membershipService.deleteMembership(membershipId, clubId);
        return ResponseEntity.ok().build();
    }
}
