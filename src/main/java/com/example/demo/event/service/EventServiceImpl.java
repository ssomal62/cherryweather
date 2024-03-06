package com.example.demo.event.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.entity.Account;
import com.example.demo.account.repository.AccountRepository;
import com.example.demo.club.entity.Club;
import com.example.demo.club.repository.ClubRepository;
import com.example.demo.event.dto.*;
import com.example.demo.event.entity.Event;
import com.example.demo.event.enums.EventStatus;
import com.example.demo.event.enums.Weather;
import com.example.demo.event.repository.EventRepository;
import com.example.demo.event_membership.entity.EventMembership;
import com.example.demo.event_membership.repository.EventMembershipRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class EventServiceImpl implements EventService{

    private final EventRepository eventRepository;
    private final AccountRepository accountRepository;
    private final ClubRepository clubRepository;
    private final EventMembershipRepository eventMembershipRepository;
    @Override
    @Transactional
    public EventViewDTO createEvent(EventCreateDTO eventCreateDTO,
                                    AccountDetails accountDetail
                                   ) {

        Account account = accountRepository.findById(accountDetail.getAccount().getAccountId())
                .orElseThrow(() -> new IllegalArgumentException("Account not found with ID: " + accountDetail.getAccount().getAccountId()));
        Long accountId = accountDetail.getAccount().getAccountId();

        Club club = clubRepository.findById(eventCreateDTO.getClubId())
                .orElseThrow(() -> new IllegalArgumentException("Club not found with id: " + eventCreateDTO.getClubId()));

        Event event = Event.builder()
                .accountId(account)
                .clubId(club)
                .eventRepresentative(accountDetail.getAccount().getAccountId())
                .eventSubject(eventCreateDTO.getEventSubject())
                .eventContent(eventCreateDTO.getEventContent())
                .code(eventCreateDTO.getCode())
                .eventEndDate(eventCreateDTO.getEventEndDate())
                .eventTimeStart(eventCreateDTO.getEventTimeStart())
                .activitiesArea(eventCreateDTO.getActivitiesArea())
                .eventCountCurrent(1)
                .eventCapacity(eventCreateDTO.getEventCapacity())
                .eventStatus(EventStatus.PUBLIC)
                .eventWeather(Weather.valueOf(eventCreateDTO.getEventWeather().toUpperCase()))
                .disclosureStatus(true)
                .createdUserId(accountDetail.getAccount().getAccountId())
                .updatedUserId(accountDetail.getAccount().getAccountId())
                .build();


        event = eventRepository.save(event);
        EventMembership eventMembership = EventMembership.builder()
                .account(account)
                .event(event)
                .createdAt(LocalDateTime.now())
                .build();

        eventMembershipRepository.save(eventMembership);

        // Convert saved entity to EventViewDTO
        EventViewDTO eventViewDTO = convertToEventViewDTO(event);
        return eventViewDTO;
    }

    private EventViewDTO convertToEventViewDTO(Event event) {
        EventViewDTO dto = new EventViewDTO();

        dto.setEventSubject(event.getEventSubject());
        dto.setEventContent(event.getEventContent());
        dto.setCode(event.getCode());
        dto.setEventEndDate(event.getEventEndDate());
        dto.setEventTimeStart(event.getEventTimeStart());
        dto.setActivitiesArea(event.getActivitiesArea());
        dto.setEventCountCurrent(event.getEventCountCurrent());
        dto.setEventCapacity(event.getEventCapacity());
        dto.setEventStatus(event.getEventStatus() != null ? event.getEventStatus().toString() : null);
        dto.setEventWeather(event.getEventWeather() != null ? event.getEventWeather().toString() : null);
        dto.setDisclosureStatus(event.getDisclosureStatus());
        dto.setCreatedDate(event.getCreatedDate());
        dto.setUpdatedDate(event.getUpdatedDate());

        return dto;
    }

    @Override
    public List<EventDetailListDTO> getAllEventsByClubId(Long clubId) {
        return eventRepository.findByClubId(clubId).stream()
                .map(event ->
                        EventDetailListDTO.builder()
                                .eventId(event.getEventId())
                                .eventStatus(event.getEventStatus())
                                .eventContent(event.getEventContent())
                                .eventSubject(event.getEventSubject())
                                .eventEndDate(event.getEventEndDate())
                                .eventTimeStart(event.getEventTimeStart())
                                .activitiesArea(event.getActivitiesArea())
                                .code(event.getCode())
                                .eventCountCurrent(event.getEventCountCurrent())
                                .eventCapacity(event.getEventCapacity())
                                .eventWeather(event.getEventWeather())
                                .disclosureStatus(event.getDisclosureStatus())
                                .createdDate(event.getCreatedDate())
                                .updatedDate(event.getUpdatedDate())
                                .clubId(event.getClubId().getClubId())
                                .build())
                .toList();
    }
    @Override
    public List<EventListDTO> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(event -> new EventListDTO(
                        event.getClubId().getClubId(),
                        event.getEventId(),
                        event.getEventSubject(),
                        event.getEventEndDate(),
                        event.getEventCapacity(),
                        event.getEventStatus()))
                .collect(Collectors.toList());
    }

    @Override
    public EventDetailListDTO getEventDetail(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id " + eventId));

        return new EventDetailListDTO(
                event.getClubId().getClubId(),
                event.getEventId(),
                event.getEventSubject(),
                event.getEventContent(),
                event.getEventEndDate(),
                event.getEventTimeStart(),
                event.getActivitiesArea(),
                event.getCode(),
                event.getEventCountCurrent(),
                event.getEventCapacity(),
                event.getEventStatus(),
                event.getEventWeather(),
                event.getDisclosureStatus(),
                event.getCreatedDate(),
                event.getUpdatedDate());
    }

    @Override
    public void deleteEvent(long eventId) {
        eventRepository.deleteById(eventId);
    }

    @Override
    public void updateEvent(EventUpdateDTO updateDTO) {
        Event existingEvent = eventRepository.findById(updateDTO.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found with id " + updateDTO.getEventId()));

        // 업데이트 권한 검증
//        if (existingEvent.getCreatedUserId() != updateDTO.getUpdatedUserId()) {
//            throw new RuntimeException("Only the creator can update this event.");
//        }

        existingEvent.updateEvent(
                updateDTO.getEventSubject(),
                updateDTO.getEventContent(),
                updateDTO.getCode(),
                updateDTO.getEventEndDate(),
                updateDTO.getEventTimeStart(),
                updateDTO.getActivitiesArea(),
                updateDTO.getEventStatus(),
                updateDTO.getEventWeather(),
                updateDTO.getDisclosureStatus()

        );
        eventRepository.save(existingEvent);
    }

}
