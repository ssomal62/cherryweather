package com.example.demo.event_membership.service;

import com.example.demo.account.entity.Account;
import com.example.demo.account.repository.AccountRepository;
import com.example.demo.event.entity.Event;
import com.example.demo.event.repository.EventRepository;
import com.example.demo.event_membership.dto.EventSignupDTO;
import com.example.demo.event_membership.entity.EventMembership;
import com.example.demo.event_membership.repository.EventMembershipRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;


@Service
@RequiredArgsConstructor

public class EventMembershipServiceImpl implements EventMembershipService{
    private final EventMembershipRepository eventMembershipRepository;
    private final AccountRepository accountRepository;
    private final EventRepository eventRepository;


    @Override
    @Transactional
    public void signupToEvent(EventSignupDTO eventSignupDTO) {
        Optional<Account> accountOptional = accountRepository.findById(eventSignupDTO.getAccountId());
        Optional<Event> eventOptional = eventRepository.findById(eventSignupDTO.getEventId());

        if (!accountOptional.isPresent() || !eventOptional.isPresent()) {
            throw new RuntimeException("Account or Event not found");
        }

        EventMembership eventMembership = EventMembership.builder()
                .account(accountOptional.get())
                .event(eventOptional.get())
                .createdAt(LocalDateTime.now())
                .build();

        eventMembershipRepository.save(eventMembership);
    }
}
