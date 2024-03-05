package com.example.demo.event_membership.service;

import com.example.demo.event_membership.dto.EventSignupDTO;

public interface EventMembershipService {
    void signupToEvent(EventSignupDTO eventSignupDTO);

//    Object getEventMembers(Long eventId);
}
