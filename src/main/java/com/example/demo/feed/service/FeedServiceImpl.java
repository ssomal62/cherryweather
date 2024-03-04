package com.example.demo.feed.service;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.club.entity.Club;
import com.example.demo.club.exception.BadRequestException;
import com.example.demo.club.repository.ClubRepository;
import com.example.demo.common.exception.AuthException;
import com.example.demo.common.exception.NotFoundException;
import com.example.demo.feed.dto.*;
import com.example.demo.feed.entity.Feed;
import com.example.demo.feed.repository.FeedRepository;
import com.example.demo.feed.utils.FeedValidator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.demo.common.exception.enums.ExceptionStatus.NOT_FOUND_CLUB;
import static com.example.demo.common.exception.enums.ExceptionStatus.NOT_POST_OWNER;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

    private final FeedRepository feedRepository;
    private final ClubRepository clubRepository;
    private final ApplicationEventPublisher eventPublisher;

    // ======================= CRUD OPERATIONS ======================= //
    // Club 관련 CRUD 작업 처리 메서드

    // 모든 Feed 엔티티 조회 (비공개 포함)
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> findAll() {
        List<Feed> feeds = feedRepository.findAll();

        List<FeedListDTO> feedListDTOs = feeds.stream()
                .map(this::feedToFeedListDTO)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("list", feedListDTOs);
        return ResponseEntity.ok(response);
    }

    // 공개 Feed 조회
    @Override
    public ResponseEntity<Map<String, Object>> findByIsPublicTrue() {
        List<Feed> feeds = feedRepository.findByIsPublicTrue();

        List<FeedListDTO> feedListDTOs = feeds.stream()
                .map(this::feedToFeedListDTO)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("list", feedListDTOs);
        return ResponseEntity.ok(response);
    }

    //클럽 ID 피드 조회
    // FeedServiceImpl 클래스에 메서드 구현
    @Override
    @Transactional(readOnly = true)
    public List<FeedListDTO> findByClubId(Long clubId) {
        List<Feed> feeds = feedRepository.findByClubId(clubId);
        return feeds.stream()
                .map(this::feedToFeedListDTO)
                .collect(Collectors.toList());
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
    public void deleteFeed(final @AuthenticationPrincipal AccountDetails accountDetails,Long feedId) {
        // 먼저 피드가 존재하는지 확인
        if (!feedRepository.existsById(feedId)) {
            throw new EntityNotFoundException("Feed not found with id: " + feedId);
        }
        //작성자 본인인지 확인
        Feed existingFeed = findFeedById(feedId);
        validateUserName(accountDetails.getAccount().getProfileName(),existingFeed.getUserName() );
        // 피드가 존재하면 삭제
        feedRepository.deleteById(feedId);
    }

    @Transactional
    public Feed updateFeed(@AuthenticationPrincipal AccountDetails accountDetails, FeedUpdateDTO requestDTO) {
        Feed existingFeed = findFeedById(requestDTO.feedId());
        validateUserName(accountDetails.getAccount().getProfileName(),existingFeed.getUserName());
        existingFeed.updateFeed(requestDTO);
        feedRepository.save(
                validateDTO(existingFeed)
        );
        return existingFeed;
    }


    /**
     * 단일 피드 조회 */
    @Override
    @Transactional(readOnly = true)
    public FeedListDTO getFeedById(Long feedId) {
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new EntityNotFoundException("Feed not found with id: " + feedId));

        Club club = feed.getClub(); // 피드와 연관된 클럽 정보를 가져옵니다.

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

        ClubDTO clubDTO = ClubDTO.builder()
                .clubId(club.getClubId())
                .name(club.getName())
                .code(club.getCode())
                .description(club.getDescription())
                .activitiesArea(club.getActivitiesArea())
                .build();

        return new FeedListDTO(feedDTO, clubDTO);
    }



    /**
 * 요청 데이터를 기반으로 새로운 Feed 엔티티를 생성
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
 * 엔티티를  FeedListDTO로 변환
 */
private FeedListDTO feedToFeedListDTO(Feed feed) {
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
}

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

    public Feed findFeedById(final long feedId) {
        return feedRepository.findById(feedId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_CLUB));
    }

    private void validateUserName(String currentUsername, String requestUsername) {
        if (!currentUsername.equals(requestUsername)) {
            throw new AuthException(NOT_POST_OWNER);
        }
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


    public FeedRequestDTO setUserInfo(FeedRequestDTO requestDTO, AccountDetails accountDetails) {
        // AccountDetails 객체로부터 사용자 이름과 프로필 이미지 URL을 가져옵니다.
        String userName = accountDetails.getAccount().getProfileName();
        String userProfile = accountDetails.getAccount().getProfileImage();

        // Builder 패턴을 사용하여 기존의 requestDTO 내용을 유지하면서 userName과 userProfile만 변경하여 새로운 DTO 객체를 생성합니다.
        return FeedRequestDTO.builder()
                .userName(userName)
                .userProfile(userProfile)
                .isPublic(requestDTO.isPublic())
                .weather(requestDTO.weather())
                .content(requestDTO.content())
                .feedCode(requestDTO.feedCode())
                .countLiked(requestDTO.countLiked())
                .liked(requestDTO.liked())
                .clubId(requestDTO.clubId())
                .build();
    }
}