package com.example.demo.club.repository.spec;

import com.example.demo.club.entity.Club;
import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubGrade;
import com.example.demo.club.enums.ClubStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class ClubSpecification {

    private ClubSpecification() {
        throw new IllegalStateException("Specification class");
    }

    /**
     * 클럽 (공개)상태 기준으로 조회합니다.
     */
    public static Specification<Club> equalClubStatus(ClubStatus status) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status.name());
    }

    /**
     * 클럽 이름 기준으로 조회합니다.
     */
    public static Specification<Club> likeClubName(String name) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }

    /**
     * 클럽 활동지역 기준으로 조회합니다.
     */
    public static Specification<Club> likeActivitiesArea(String activitiesArea) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("activitiesArea"), "%" + activitiesArea + "%");
    }

    /**
     * 클럽 CATEGORY 기준으로 조회합니다.
     */
    public static Specification<Club> equalClubCategory(ClubCategory category) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("category"), category.name());
    }

    /**
     * 클럽 GRADE 기준으로 조회합니다.
     */
    public static Specification<Club> equalClubGrade(ClubGrade grade) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("grade"), grade.name());
    }

    /**
     * 최근 한달 내 생성된 클럽을 조회합니다.
     */
    public static Specification<Club> findRecentClubs(LocalDateTime createdAt) {
        return (root, query, criteriaBuilder) -> {

            LocalDateTime thirtyDaysAgo = createdAt.minusDays(30);
            return criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), thirtyDaysAgo);
        };
    }
}