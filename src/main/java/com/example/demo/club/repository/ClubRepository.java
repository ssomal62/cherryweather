package com.example.demo.club.repository;

import com.example.demo.club.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ClubRepository extends JpaRepository <Club, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Club c SET c.currentMembers = c.currentMembers + 1 WHERE c.clubId = :clubId")
    void increaseCurrentMembers(@Param("clubId") Long clubId);

    @Transactional
    @Modifying
    @Query("UPDATE Club c SET c.currentMembers = c.currentMembers - 1 WHERE c.clubId = :clubId")
    void decreaseCurrentMembers(@Param("clubId") Long clubId);

    @Transactional
    @Modifying
    @Query("UPDATE Club c SET c.currentGrowthMeter = c.currentGrowthMeter + 100 WHERE c.clubId = :clubId")
    void increaseCurrentGrowthMeter(long clubId);

    @Transactional
    @Modifying
    @Query("UPDATE Club c SET c.currentGrowthMeter = c.currentGrowthMeter - 100 WHERE c.clubId = :clubId")
    void decreaseCurrentGrowthMeter(long clubId);

}
