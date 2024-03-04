package com.example.demo.event.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.event.dto.*;

import java.util.List;

public interface EventService {
    EventViewDTO createEvent(EventCreateDTO eventCreateDTO, AccountDetails accountDetails);
    List<EventListDTO> getAllEvents();
    EventDetailListDTO getEventDetail(Long eventId);

    void deleteEvent(long eventId);

    void updateEvent(EventUpdateDTO updateDTO);
}
