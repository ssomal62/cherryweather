package com.example.demo.feed.service;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.club.dto.CreateClubDTO;
import com.example.demo.club.entity.Club;
import com.example.demo.club.event.ClubCreationEvent;
import com.example.demo.club.exception.BadRequestException;
import com.example.demo.club.repository.ClubRepository;
import com.example.demo.club.utils.ClubValidator;
import com.example.demo.feed.dto.*;
import com.example.demo.feed.entity.Feed;
import com.example.demo.feed.repository.FeedRepository;
import com.example.demo.feed.utils.FeedValidator;
import com.example.demo.membership.dto.ClubSignupDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

    private final FeedRepository feedRepository;
    private final ClubRepository clubRepository;
    private final ApplicationEventPublisher eventPublisher;

    // ======================= CRUD OPERATIONS ======================= //
    // Club 관련 CRUD 작업 처리 메서드

    // 모든 Feed 엔티티 조회
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> findAll() {
        List<Feed> feeds = feedRepository.findAll();

        List<FeedListDTO> feedListDTOs = feeds.stream().map(feed -> {
            ClubDTO clubDTO = ClubDTO.builder()
                    .clubId(feed.getClub().getClubId())
                    .name(feed.getClub().getName())
                    .code(feed.getClub().getCode())
                    .description(feed.getClub().getDescription())
                    .activitiesArea(feed.getClub().getActivitiesArea())
                    .build();

            FeedDTO feedDTO = FeedDTO.builder()
                    .feedId(feed.getFeedId())
                    .userName(feed.getUserName())
                    .userProfile(feed.getUserProfile())
                    .content(feed.getContent())
                    .feedCode(feed.getFeedCode())
                    .countLiked(feed.getCountLiked())
                    .liked(feed.isLiked())
                    .weather(feed.getWeather())
                    .isPublic(feed.isPublic())
                    .createdAt(feed.getCreatedAt())
                    .build();

            return new FeedListDTO(feedDTO, clubDTO);
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("list", feedListDTOs);
        return ResponseEntity.ok(response);
    }

    @Override
    @Transactional
    public FeedListDTO saveFeed(FeedRequestDTO requestDTO) {
        // FeedRequestDTO를 Feed 엔티티로 변환
        Feed feed = validateDTO(convertToEntity(requestDTO));

        // 저장된 Feed 엔티티로부터 FeedListDTO 생성 및 반환
        return createFeed(requestDTO);
    }

    @Override
    public void deleteFeed(Long feedId) {
        // 먼저 피드가 존재하는지 확인
        if (!feedRepository.existsById(feedId)) {
            throw new EntityNotFoundException("Feed not found with id: " + feedId);
        }
        // 피드가 존재하면 삭제
        feedRepository.deleteById(feedId);
    }

    @Override
    public FeedListDTO updateFeed(Long feedId, FeedUpdateDTO requestDTO) {
        return null;
    }

//    @Transactional
//    public void updateClub(UpdateClubDTO requestDTO, AccountDetails accountDetails) {
//        Club existingClub = findClubById(requestDTO.clubId());
//        existingClub.updateClub(requestDTO, accountDetails);
//        clubRepository.save(
//                validateDTO(existingClub)
//        );
//    }
//
//    @Transactional
//    public void deleteClub(long clubId) {
//        clubRepository.deleteById(
//                findClubById(clubId).getClubId()
//        );
//    }

// ===================== TRANSACTIONAL METHODS ==================== //
// 특정 트랜잭션 관련 로직 관리 메서드

//    @Transactional
//    public void increaseCurrentMembers(long clubId) {
//        clubRepository.increaseCurrentMembers(clubId);
//    }
//
//    @Transactional
//    public void decreaseCurrentMembers(long clubId) {
//        clubRepository.decreaseCurrentMembers(clubId);
//    }
//
//    @Transactional
//    public void increaseGrowthMeter(long clubId) {
//        clubRepository.increaseCurrentGrowthMeter(clubId);
//    }
//
//    @Transactional
//    public void decreaseGrowthMeter(long clubId) {
//        clubRepository.decreaseCurrentGrowthMeter(clubId);
//    }

// =================== DOMAIN CONVERSION METHODS ================== //
// DTO와 Entity 간 변환 담당 메서드

//    public Club findClubById(final long clubId) {
//        return clubRepository.findById(clubId)
//                .orElseThrow(() -> new NotFoundException(NOT_FOUND_CLUB));
//    }
//
//    public ClubListDTO fromFeeds(List<Club> clubs, Optional<AccountDetails> accountDetailsOptional) {
//        List<ClubSummary> summaries = clubs.stream()
//                .map(this::convertToSummary)
//                .map(summary -> accountDetailsOptional
//                        .map(accountDetails -> convertToLike(summary, accountDetails))
//                        .orElse(summary))
//                .toList();
//
//        return ClubListDTO.builder()
//                .summaryList(summaries)
//                .build();
//    }

// ======================= UTILITY METHODS ======================= //
// 보조 기능 및 유틸리티 메서드

/**
 * 현재 인증된 사용자의 상세 정보를 반환
 * @return 인증된 사용자의 {@link AccountDetails}를 포함하는 {@link Optional}, 인증되지 않은 경우 빈 {@link Optional}.
 */
//    private Optional<AccountDetails> getCurrentAccountDetails() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        boolean isAuthenticated = authentication != null && !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
//
//        return isAuthenticated ? Optional.ofNullable((AccountDetails) authentication.getPrincipal()) : Optional.empty();
//    }

/**
 * 요청 데이터를 기반으로 새로운 Club 엔티티를 생성
 *
 */
@Transactional
public FeedListDTO  createFeed(FeedRequestDTO requestDTO) {
    Club clubdata = clubRepository.findById(requestDTO.clubId())
            .orElseThrow(() -> new EntityNotFoundException("Club not found with id: " + requestDTO.clubId()));

    Feed feedData = Feed.builder()
            .userName(requestDTO.userName())
            .userProfile(requestDTO.userProfile())
            .content(requestDTO.content())
            .feedCode(requestDTO.feedCode())
            .weather(requestDTO.weather())
            .isPublic(requestDTO.isPublic())
            .countLiked("0")  // Default value
            .liked(false)  // Default value
            .club(clubdata)
            .build();

    Feed savedFeed = feedRepository.save(feedData);

    // 저장된 Feed 엔티티로부터 FeedDTO 생성
    FeedDTO feed = FeedDTO.builder()
            .feedId(savedFeed.getFeedId())
            .userName(savedFeed.getUserName())
            .userProfile(savedFeed.getUserProfile())
            .content(savedFeed.getContent())
            .feedCode(savedFeed.getFeedCode())
            .weather(savedFeed.getWeather())
            .isPublic(savedFeed.isPublic())
            .createdAt(savedFeed.getCreatedAt()) // 이 필드는 자동 설정되어야 합니다.
            .countLiked("0") // 저장된 Feed 엔티티 기반으로 초기값 재확인
            .liked(false) // 저장된 Feed 엔티티 기반으로 초기값 재확인
            .build();

    // 저장된 Feed와 연관된 Club 엔티티로부터 ClubDTO 생성
    ClubDTO club = ClubDTO.builder()
            .clubId(clubdata.getClubId())
            .name(clubdata.getName())
            .code(clubdata.getCode())
            .description(clubdata.getDescription())
            .activitiesArea(clubdata.getActivitiesArea())
            .build();

    // FeedDTO와 ClubDTO를 포함하는 FeedListDTO 반환
    return FeedListDTO.builder()
            .feedDTO(feed)
            .clubDTO(club)
            .build();
}

/**
 * Club 엔티티를 ClubSummary DTO로 변환
 */
//    public ClubSummary convertToSummary(Club club) {
//        return ClubSummary.builder()
//                .clubId(club.getClubId())
//                .name(club.getName())
//                .code(club.getCode())
//                .description(club.getDescription())
//                .activitiesArea(club.getActivitiesArea())
//                .joinApprovalStatus(club.getJoinApprovalStatus())
//                .currentMembers(club.getCurrentMembers())
//                .maxMembers(club.getMaxMembers())
//                .status(club.getStatus())
//                .tag(club.getTag())
//                .category(club.getCategory())
//                .grade(club.getGrade())
//                .build();
//    }

/**
 * ClubSummary 객체에 "좋아요" 상태를 추가
 */
//    private ClubSummary convertToLike(ClubSummary summary, AccountDetails accountDetails) {
//        boolean liked = likeService.existsLike(
//                accountDetails,
//                LikeType.CLUB,
//                summary.clubId()
//        );
//        return ClubSummary.builder()
//                .clubId(summary.clubId())
//                .name(summary.name())
//                .code(summary.code())
//                .description(summary.description())
//                .activitiesArea(summary.activitiesArea())
//                .joinApprovalStatus(summary.joinApprovalStatus())
//                .currentMembers(summary.currentMembers())
//                .maxMembers(summary.maxMembers())
//                .status(summary.status())
//                .tag(summary.tag())
//                .category(summary.category())
//                .grade(summary.grade())
//                .liked(liked)
//                .build();
//    }

/**
 * Club 엔티티의 유효성을 검증
 */
private Feed validateDTO(Feed feed) {
    FeedValidator validator = FeedValidator.of(feed)
            .validateUserName()
            .validateContent()
            .validateWeather();
    // 필요한 다른 검증 로직을 체이닝 방식으로 호출합니다.

    if (!validator.isValid()) {
        List<String> errors = validator.getErrors();
        String errorMessage = String.join(", ", errors);
        throw new BadRequestException("유효성 검사 실패: " + errorMessage);
    }
    return feed;
}

    private Feed convertToEntity(FeedRequestDTO requestDTO) {
        Club club = clubRepository.findById(requestDTO.clubId())
                .orElseThrow(() -> new EntityNotFoundException("Club not found with id: " + requestDTO.clubId()));

        return Feed.builder()
                .userName(requestDTO.userName())
                .userProfile(requestDTO.userProfile())
                .content(requestDTO.content())
                .feedCode(requestDTO.feedCode())
                .weather(requestDTO.weather())
                .isPublic(requestDTO.isPublic())
                .countLiked(requestDTO.countLiked())
                .liked(requestDTO.liked())
                .club(club) // 연관된 Club 엔티티 설정
                .build();
    }
}