package com.example.demo.club.service;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.entity.Account;
import com.example.demo.account.repository.AccountRepository;
import com.example.demo.alarm.dto.AlarmDto;
import com.example.demo.alarm.service.AlarmServiceImpl;
import com.example.demo.club.domain.ClubSummary;
import com.example.demo.club.dto.*;
import com.example.demo.club.entity.Club;
import com.example.demo.club.enums.ClubGrade;
import com.example.demo.club.event.ClubCreationEvent;
import com.example.demo.club.exception.BadRequestException;
import com.example.demo.club.repository.ClubRepository;
import com.example.demo.club.utils.ClubValidator;
import com.example.demo.common.exception.NotFoundException;
import com.example.demo.common.exception.ServiceFailedException;
import com.example.demo.like.entity.Like;
import com.example.demo.like.enums.LikeType;
import com.example.demo.like.service.LikeService;
import com.example.demo.membership.dto.ClubSignupDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.example.demo.club.enums.ClubGrade.*;
import static com.example.demo.common.exception.enums.ExceptionStatus.*;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final LikeService likeService;
    private final AccountRepository accountRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final AlarmServiceImpl alarmService;

    // ======================= CRUD OPERATIONS ======================= //
    // Club 관련 CRUD 작업 처리 메서드

    @Transactional(readOnly = true)
    public ClubListDTO findAll() {
        Optional<AccountDetails> accountDetailsOptional = getCurrentAccountDetails();
        List<Club> clubs = clubRepository.findAllByOrderByCreatedAtDesc();
        return fromClubs(clubs, accountDetailsOptional);
    }

    @Transactional(readOnly = true)
    public ClubDetailDTO findDetail(long clubId) {
        Optional<AccountDetails> accountDetailsOptional = getCurrentAccountDetails();
        Club club = findClubById(clubId);
        Optional<Account> findAccount = accountRepository.findById(club.getRepresentativeUserId());
        boolean liked = accountDetailsOptional
                .map(accountDetails -> likeService.existsLike(accountDetails, LikeType.CLUB, clubId))
                .orElse(false);

        return ClubDetailDTO.builder()
                .clubDetail(club)
                .hostName(findAccount.get().getProfileName())
                .hostProfile(findAccount.get().getProfileImage())
                .liked(liked)
                .build();
    }

    @Transactional(readOnly = true)
    public List<LikeWithClubList> findClubLikesForCurrentUser() {
        Optional<AccountDetails> accountDetailsOptional = getCurrentAccountDetails();
        if (accountDetailsOptional.isEmpty()) {
            throw new ServiceFailedException(NO_AUTHORIZATION);
        }
        List<Like> clubLikes = likeService.findAllByAccountAndType(accountDetailsOptional.get(), "CLUB");

        return clubLikes.stream().map(like -> {
            Club club = this.findClubById(like.getTargetId());
            ClubSummary summary = this.convertToSummary(club);
            return new LikeWithClubList(like.getLikeId(), summary);
        }).toList();
    }

    @Transactional
    public Club saveClub(CreateClubDTO requestDTO, AccountDetails accountDetails) {
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

        alarmService.createAlarm(
                AlarmDto.builder()
                        .targetId(accountDetails.getAccount().getAccountId())
                        .description("내 클럽이 생성되었습니다.")
                        .build(),
                accountDetails
        );

        return saveClub;
    }

    @Transactional
    public void updateClub(UpdateClubDTO requestDTO, AccountDetails accountDetails) {
        Club existingClub = findClubById(requestDTO.clubId());
        existingClub.updateClub(requestDTO, accountDetails);
        clubRepository.save(
                validateDTO(existingClub)
        );
    }

    public void updateClub(ClubGrade currenGrade, Club findClub) {
        findClub.updateClub(currenGrade);
    }

    @Transactional
    public void deleteClub(long clubId) {
        clubRepository.deleteById(
                findClubById(clubId).getClubId()
        );
    }

    // ===================== TRANSACTIONAL METHODS ==================== //
    // 특정 트랜잭션 관련 로직 관리 메서드

    @Transactional
    public void increaseCurrentMembers(long clubId) {
        clubRepository.increaseCurrentMembers(clubId);
    }

    @Transactional
    public void decreaseCurrentMembers(long clubId) {
        clubRepository.decreaseCurrentMembers(clubId);
    }

    @Transactional
    public void increaseGrowthMeter(long clubId, int score) {
        Club club = findClubById(clubId);
        int newScore = club.getCurrentGrowthMeter() + score;

        if (club.getGrade() == ClubGrade.RADIANT_RAINBOW) {
            throw new ServiceFailedException(INVALID_TYPE_VALUE);
        }

        if (newScore >= club.getMaxGrowthMeter()) {
            upgradeClubGrade(club);
            int remainder = newScore - club.getMaxGrowthMeter();
            clubRepository.resetCurrentGrowthMeter(clubId);
            if (remainder > 0) {
                clubRepository.increaseCurrentGrowthMeter(clubId, remainder);
            }
        } else {
            clubRepository.increaseCurrentGrowthMeter(clubId, score);
        }
        clubRepository.save(club);
    }

    private void upgradeClubGrade(Club club) {
        switch (club.getGrade()) {
            case GENTLE_BREEZE -> updateClub(THUNDERSTORM, club);
            case THUNDERSTORM -> updateClub(SNOWY_WHISPERS, club);
            case SNOWY_WHISPERS -> updateClub(WARM_SUNLIGHT, club);
            case WARM_SUNLIGHT -> updateClub(RADIANT_RAINBOW, club);
            default -> {
                throw new IllegalArgumentException("Unexpected grade: " + club.getGrade());
            }
        }
    }

    @Transactional
    public void decreaseGrowthMeter(long clubId, int score) {
        clubRepository.decreaseCurrentGrowthMeter(clubId, score);
    }

    @Transactional
    public void increaseFeedCount(long clubId) {
        clubRepository.increaseFeedCount(clubId);
    }

    @Transactional
    public void decreaseFeedCount(long clubId) {
        clubRepository.decreaseFeedCount(clubId);
    }

    // =================== DOMAIN CONVERSION METHODS ================== //
    // DTO와 Entity 간 변환 담당 메서드

    public Club findClubById(final long clubId) {
        return clubRepository.findById(clubId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_CLUB));
    }

    public ClubListDTO fromClubs(List<Club> clubs, Optional<AccountDetails> accountDetailsOptional) {
        List<ClubSummary> summaries = clubs.stream()
                .map(this::convertToSummary)
                .map(summary -> accountDetailsOptional
                        .map(accountDetails -> convertToLike(summary, accountDetails))
                        .orElse(summary))
                .toList();

        return ClubListDTO.builder()
                .summaryList(summaries)
                .build();
    }

    // ======================= UTILITY METHODS ======================= //
    // 보조 기능 및 유틸리티 메서드

    /**
     * 현재 인증된 사용자의 상세 정보를 반환
     *
     * @return 인증된 사용자의 {@link AccountDetails}를 포함하는 {@link Optional}, 인증되지 않은 경우 빈 {@link Optional}.
     */
    private Optional<AccountDetails> getCurrentAccountDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAuthenticated = authentication != null && !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();

        return isAuthenticated ? Optional.ofNullable((AccountDetails) authentication.getPrincipal()) : Optional.empty();
    }

    /**
     * 요청 데이터를 기반으로 새로운 Club 엔티티를 생성
     */
    private Club createClub(CreateClubDTO requestDTO, AccountDetails accountDetails) {
        return Club.builder()
                .name(requestDTO.name())
                .description(requestDTO.description())
                .code(requestDTO.code())
                .notice(requestDTO.notice())
                .grade(GENTLE_BREEZE)
                .tag(requestDTO.tag())
                .category(requestDTO.category())
                .subCategory(requestDTO.subCategory())
                .feedCount(0)
                .joinApprovalStatus(requestDTO.joinApprovalStatus().toUpperCase())
                .status(requestDTO.status())
                .activitiesArea(requestDTO.activitiesArea())
                .createdUserId(accountDetails.getAccount().getAccountId())
                .representativeUserId(accountDetails.getAccount().getAccountId())
                .currentMembers(0)
                .maxMembers(GENTLE_BREEZE.getMaxMembers())
                .currentGrowthMeter(0)
                .maxGrowthMeter(GENTLE_BREEZE.getMaxGrowthMeter())
                .build();
    }

    /**
     * Club 엔티티를 ClubSummary DTO로 변환
     */
    public ClubSummary convertToSummary(Club club) {
        return ClubSummary.builder()
                .clubId(club.getClubId())
                .name(club.getName())
                .code(club.getCode())
                .feedCount(club.getFeedCount())
                .description(club.getDescription())
                .activitiesArea(club.getActivitiesArea())
                .joinApprovalStatus(club.getJoinApprovalStatus())
                .currentMembers(club.getCurrentMembers())
                .maxMembers(club.getMaxMembers())
                .status(club.getStatus())
                .tag(club.getTag())
                .category(club.getCategory())
                .grade(club.getGrade())
                .build();
    }

    /**
     * ClubSummary 객체에 "좋아요" 상태를 추가
     */
    private ClubSummary convertToLike(ClubSummary summary, AccountDetails accountDetails) {
        boolean liked = likeService.existsLike(
                accountDetails,
                LikeType.CLUB,
                summary.clubId()
        );
        return ClubSummary.builder()
                .clubId(summary.clubId())
                .name(summary.name())
                .code(summary.code())
                .feedCount(summary.feedCount())
                .description(summary.description())
                .activitiesArea(summary.activitiesArea())
                .joinApprovalStatus(summary.joinApprovalStatus())
                .currentMembers(summary.currentMembers())
                .maxMembers(summary.maxMembers())
                .status(summary.status())
                .tag(summary.tag())
                .category(summary.category())
                .grade(summary.grade())
                .liked(liked)
                .build();
    }

    /**
     * Club 엔티티의 유효성을 검증
     */
    private Club validateDTO(Club club) {
        ClubValidator validator = ClubValidator.of(club)
                .validateName()
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
