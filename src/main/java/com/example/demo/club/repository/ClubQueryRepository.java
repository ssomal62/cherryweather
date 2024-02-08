package com.example.demo.club.repository;

import com.example.demo.club.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ClubQueryRepository extends JpaRepository<Club, Long>, JpaSpecificationExecutor<Club> {

}