package com.example.demo.event.repository;

import com.example.demo.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {


    @Query("SELECT e FROM Event e WHERE e.clubId.clubId = :clubId")
    List<Event> findByClubId(@Param("clubId") Long clubId);
}