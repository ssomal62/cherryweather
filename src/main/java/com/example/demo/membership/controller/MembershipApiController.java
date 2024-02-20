package com.example.demo.membership.controller;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.membership.dto.ClubSignupDTO;
import com.example.demo.membership.dto.MembershipListDTO;
import com.example.demo.membership.dto.UpdateMembership;
import com.example.demo.membership.dto.MembershipQueryDTO;
import com.example.demo.membership.service.MembershipQueryService;
import com.example.demo.membership.service.MembershipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/membership")
public class MembershipApiController {

    private final MembershipService membershipService;
    private final MembershipQueryService membershipQueryService;

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
     * 개인 멤버십 조회
     */
    @GetMapping("/accounts")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MembershipListDTO> findAllMembershipsByAccount(
            final @AuthenticationPrincipal AccountDetails accountDetails
    ) {
        return ResponseEntity.ok().body(
                membershipService.findAllByAccount(accountDetails)
        );
    }

    /**
     * 멤버십 등록 여부
     */
    @GetMapping("/{clubId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Boolean> checkMember(
            final @PathVariable(value = "clubId") long clubId,
            final @AuthenticationPrincipal AccountDetails accountDetails
    ) {
        return ResponseEntity.ok().body(
                membershipService.checkMember(clubId, accountDetails)
        );
    }

    /**
     * 멤버십 조회
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
    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER') or hasRole('ROLE_ADMIN')")
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
