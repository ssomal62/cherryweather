package com.example.demo.event_membership.controller;

import com.example.demo.event_membership.dto.EventSignupDTO;
import com.example.demo.event_membership.service.EventMembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
    @RequestMapping("/api/events/memberships")
    @RequiredArgsConstructor
    public class EventMembershipController {

        private final EventMembershipService eventMembershipService;

        @PostMapping("/{eventId}")
        public ResponseEntity<?> signupToEvent(@RequestBody EventSignupDTO eventSignupDTO) {
            eventMembershipService.signupToEvent(eventSignupDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }

//        @GetMapping("/members")
//        public ResponseEntity<?> getEventMembers(@RequestParam Long eventId) {
//            return new ResponseEntity<>(eventMembershipService.getEventMembers(eventId), HttpStatus.OK);
//        }

}
