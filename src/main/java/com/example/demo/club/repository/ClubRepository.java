package com.example.demo.club.repository;

import com.example.demo.club.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubRepository extends JpaRepository <Club, Long> {

}
