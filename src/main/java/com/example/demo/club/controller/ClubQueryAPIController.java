package com.example.demo.club.controller;

import com.example.demo.club.dto.ClubListDTO;
import com.example.demo.club.dto.ClubQueryDTO;
import com.example.demo.club.service.ClubQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clubs/query")
public class ClubQueryAPIController {

    private final ClubQueryService clubQueryService;

    /**
     * 조건에 따라 클럽 목록을 조회하여 반환합니다.
     *
     * <p>이 메소드는 {@link ClubQueryDTO} 객체를 통해 전달받은 조건(예: 클럽 상태, 이름, 활동 지역 등)을 기반으로
     * 클럽 목록을 조회합니다. 조회된 클럽은 {@link ClubListDTO} 객체로 포장되어 반환됩니다.</p>
     *
     * <p>조건은 선택적이며, 조건이 제공되지 않은 경우 모든 클럽 목록이 조회됩니다.
     * 반환되는 {@link ClubListDTO} 객체에는 조회된 클럽의 기본 정보가 포함됩니다.</p>
     *
     * @param requestDTO 클라이언트로부터 받은 조회 조건을 담고 있는 {@link ClubQueryDTO} 객체
     * @return 조건에 맞는 클럽 목록을 담고 있는 {@link ClubListDTO} 객체. 조건에 맞는 클럽이 없는 경우 빈 목록을 포함합니다.
     */
    @GetMapping
    public ResponseEntity<ClubListDTO> findAllByConditions(
            @RequestBody ClubQueryDTO requestDTO
            ) {
        ClubListDTO clubs = clubQueryService.findAllByConditions(requestDTO);
        return ResponseEntity.status(HttpStatus.OK).body(clubs);
    }
}