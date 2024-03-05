package com.example.demo.event_membership.repository;

import com.example.demo.event_membership.entity.EventMembership;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventMembershipRepository extends JpaRepository<EventMembership, Long> {
    // 필요한 경우 여기에 추가적인 쿼리 메소드를 정의할 수 있습니다.
//    Object findByEventId(Long eventId);
}