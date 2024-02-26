package com.example.demo.club.service;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.club.dto.ClubListDTO;
import com.example.demo.club.dto.ClubQueryDTO;
import com.example.demo.club.entity.Club;
import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubGrade;
import com.example.demo.club.enums.ClubStatus;
import com.example.demo.club.repository.ClubQueryRepository;
import com.example.demo.club.repository.spec.ClubSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClubQueryService {

    private final ClubQueryRepository clubQueryRepository;
    private final ClubService clubService;

    @Transactional
    public ClubListDTO findAllByConditions(ClubQueryDTO requestDTO, Optional<AccountDetails> accountDetailsOptional) {

        Specification<Club> spec = Specification.where(null);

        spec = buildSpecificationForStatus(requestDTO.status(), spec);
        spec = buildSpecificationForName(requestDTO.name(), spec);
        spec = buildSpecificationForActivitiesArea(requestDTO.activitiesArea(), spec);
        spec = buildSpecificationForCategory(requestDTO.category(), spec);
        spec = buildSpecificationForGrade(requestDTO.grade(), spec);
        spec = buildSpecificationForCreatedAt(requestDTO.createdAt(), spec);

        List<Club> clubs = clubQueryRepository.findAll(spec);
        return clubService.fromClubs(clubs, accountDetailsOptional);
    }

    //==============  private method  ==============//

    private Specification<Club> buildSpecificationForStatus(ClubStatus status, Specification<Club> spec) {
        return Optional.ofNullable(status)
                .map(ClubSpecification::equalClubStatus)
                .map(spec::and)
                .orElse(spec);
    }

    private Specification<Club> buildSpecificationForName(String name, Specification<Club> spec) {
        return Optional.ofNullable(name)
                .map(ClubSpecification::likeClubName)
                .map(spec::and)
                .orElse(spec);
    }

    private Specification<Club> buildSpecificationForActivitiesArea(String activitiesArea, Specification<Club> spec) {
        return Optional.ofNullable(activitiesArea)
                .map(ClubSpecification::likeActivitiesArea)
                .map(spec::and)
                .orElse(spec);
    }

    private Specification<Club> buildSpecificationForCategory(ClubCategory category, Specification<Club> spec) {
        return Optional.ofNullable(category)
                .map(ClubSpecification::equalClubCategory)
                .map(spec::and)
                .orElse(spec);
    }

    private Specification<Club> buildSpecificationForGrade(ClubGrade grade, Specification<Club> spec) {
        return Optional.ofNullable(grade)
                .map(ClubSpecification::equalClubGrade)
                .map(spec::and)
                .orElse(spec);
    }

    private Specification<Club> buildSpecificationForCreatedAt(LocalDateTime createdAt, Specification<Club> spec) {
        return Optional.ofNullable(createdAt)
                .map(ClubSpecification::findRecentClubs)
                .map(spec::and)
                .orElse(spec);
    }
}
