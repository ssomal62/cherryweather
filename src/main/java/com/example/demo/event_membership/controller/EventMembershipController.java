package com.example.demo.event_membership.controller;

import com.example.demo.event_membership.dto.EventSignupDTO;
import com.example.demo.event_membership.service.EventMembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


    @RestController
    @RequestMapping("/api/events/memberships")
    @RequiredArgsConstructor
    public class EventMembershipController {

        private final EventMembershipService eventMembershipService;

        @PostMapping
        public ResponseEntity<?> signupToEvent(@RequestBody EventSignupDTO eventSignupDTO) {
            eventMembershipService.signupToEvent(eventSignupDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
}
