package com.example.demo.event.controller;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.common.service.FileService;
import com.example.demo.event.dto.*;
import com.example.demo.event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final FileService fileService;


    // 이벤트 생성
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<EventViewDTO> createEvent (
            final @RequestBody EventCreateDTO createDTO,
            final @AuthenticationPrincipal AccountDetails accountDetails

            ) {
        return ResponseEntity.ok().body(
                eventService.createEvent(createDTO, accountDetails));
    }

    // 파일 업로드
    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> createClubProfile(
            @RequestParam(value = "file") MultipartFile file) {
        fileService.uploadSingleFile(file,"event-profile");
        return ResponseEntity.ok().build();
    }

    // 이벤트 전체 출력
    @GetMapping("/list")
    public ResponseEntity<List<EventListDTO>> getAllEvents() {
        List<EventListDTO> events = eventService.getAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    // 특정 이벤트 상세 정보 조회
    @GetMapping("/detail/{eventId}")
    public ResponseEntity<EventDetailListDTO> getEventDetail(@PathVariable Long eventId) {
        EventDetailListDTO eventDetail = eventService.getEventDetail(eventId);
        return new ResponseEntity<>(eventDetail, HttpStatus.OK);
    }

    // 특정 이벤트 상세 정보 조회
    @GetMapping("/{clubId}")
    public ResponseEntity<List<EventDetailListDTO>> getClubEvent(@PathVariable(value="clubId") Long clubId) {
        List<EventDetailListDTO> eventDetailList = eventService.getAllEventsByClubId(clubId);
        return new ResponseEntity<>(eventDetailList, HttpStatus.OK);
    }
    // 이벤트 삭제
    @DeleteMapping("/delete/{eventId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable long eventId) {
        eventService.deleteEvent(eventId);
    }

    // 이벤트 수정
    @PutMapping("/{eventId}")
    public ResponseEntity<?> updateEvent(@PathVariable Long eventId, @RequestBody EventUpdateDTO updateDTO) {
        try {
            updateDTO.setEventId(eventId); // DTO에 eventId 설정
            eventService.updateEvent(updateDTO);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the event.");
        }
    }


}
