package com.example.demo.club.service;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.club.dto.ClubDetailDTO;
import com.example.demo.club.dto.ClubListDTO;
import com.example.demo.club.dto.CreateClubDTO;
import com.example.demo.club.dto.UpdateClubDTO;
import com.example.demo.club.entity.Club;
import com.example.demo.club.event.ClubCreationEvent;
import com.example.demo.club.exception.BadRequestException;
import com.example.demo.club.repository.ClubRepository;
import com.example.demo.club.utils.ClubValidator;
import com.example.demo.common.exception.NotFoundException;
import com.example.demo.membership.dto.ClubSignupDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.example.demo.club.enums.ClubGrade.GENTLE_BREEZE;
import static com.example.demo.common.exception.enums.ExceptionStatus.NOT_FOUND_CLUB;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public ClubListDTO findAll() {
        return ClubListDTO.fromClubs(clubRepository.findAll());
    }

    @Transactional
    public void saveClub(CreateClubDTO requestDTO, AccountDetails accountDetails) {
        Club saveClub = clubRepository.save(
                validateDTO(createClub(requestDTO, accountDetails))
        );

        ClubCreationEvent event =
                new ClubCreationEvent(
                        this,
                        accountDetails,
                        ClubSignupDTO.builder()
                                .clubId(saveClub.getClubId())
                                .build()
                );

        eventPublisher.publishEvent(event);
    }

    @Transactional
    public ClubDetailDTO findDetail(long clubId) {
        return ClubDetailDTO.builder()
                .clubDetail(
                        findClubById(clubId)
                ).build();
    }

    @Transactional
    public void updateClub(UpdateClubDTO requestDTO, AccountDetails accountDetails) {
        Club existingClub = findClubById(requestDTO.clubId());
        existingClub.updateClub(requestDTO, accountDetails);
        clubRepository.save(
                validateDTO(existingClub)
        );
    }

    @Transactional
    public void deleteClub(long clubId) {
        clubRepository.deleteById(
                findClubById(clubId).getClubId()
        );
    }

    public Club findClubById (final long clubId) {
        return clubRepository.findById(clubId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_CLUB));
    }

    //==============  private method  ==============//

    private Club createClub(CreateClubDTO requestDTO, AccountDetails accountDetails) {
        return Club.builder()
                .name(requestDTO.name())
                .description(requestDTO.description())
                .code(requestDTO.code())
                .grade(GENTLE_BREEZE)
                .category(requestDTO.category())
                .subCategory(requestDTO.subCategory())
                .joinApprovalStatus(requestDTO.joinApprovalStatus().toUpperCase())
                .status(requestDTO.status())
                .activitiesArea(requestDTO.activitiesArea())
                .createdUserId(accountDetails.getAccount().getAccountId())
                .representativeUserId(accountDetails.getAccount().getAccountId())
                .currentMembers(1)
                .maxMembers(GENTLE_BREEZE.getMaxMembers())
                .currentGrowthMeter(0)
                .maxGrowthMeter(GENTLE_BREEZE.getMaxGrowthMeter())
                .build();
    }

    private Club validateDTO (Club club) {
        ClubValidator validator = ClubValidator.of(club)
                .validateName()
                .validateCode()
                .validateCategory()
                .validateStatus()
                .validateActivityArea();

        if (!validator.isValid()) {
            List<String> errors = validator.getErrors();
            String errorMessage = String.join(", ", errors);
            throw new BadRequestException("Validation failed: " + errorMessage);
        }
        return club;
    }
}


