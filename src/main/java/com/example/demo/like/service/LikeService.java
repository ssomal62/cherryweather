package com.example.demo.like.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.entity.Account;
import com.example.demo.club.event.ClubGrowthEvent;
import com.example.demo.club.repository.ClubRepository;
import com.example.demo.club.service.ClubService;
import com.example.demo.like.dto.LikeInfo;
import com.example.demo.like.dto.LikeList;
import com.example.demo.like.dto.LikeListGroupByType;
import com.example.demo.like.entity.Like;
import com.example.demo.like.enums.LikeType;
import com.example.demo.like.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;

    private final ApplicationEventPublisher eventPublisher;

    // ======================= CORE FUNCTIONALITIES ======================= //

    /**
     * 사용자의 좋아요 상태를 토글. 이미 좋아요를 한 상태라면 제거, 아니면 추가.
     */
    @Transactional
    public void toggleLike(AccountDetails accountDetails,  LikeInfo infoDto) {

        ClubGrowthEvent event;
        boolean existsLike = existsLike(accountDetails, infoDto.type(), infoDto.targetId());

        if (existsLike) {
            likeRepository.deleteByAccountAndTypeAndTargetId(
                    accountDetails.getAccount(),
                    infoDto.type(),
                    infoDto.targetId());
            if(infoDto.type() == LikeType.CLUB) {
                event = new ClubGrowthEvent(this, infoDto.targetId(), false, accountDetails);
                eventPublisher.publishEvent(event);
            }
        } else {
            likeRepository.save(
                    createLike(accountDetails, infoDto)
            );
            if(infoDto.type() == LikeType.CLUB) {
                event = new ClubGrowthEvent(this, infoDto.targetId(), true, accountDetails);
                eventPublisher.publishEvent(event);
            }
        }
    }

    /**
     * 특정 유형에 대한 모든 좋아요 항목을 조회
     */
    @Transactional(readOnly = true)
    public LikeList findAllByLikeType(AccountDetails accountDetails, String type) {
        List<Like> findList = likeRepository.findAllByAccountAndType(
                accountDetails.getAccount(),
                LikeType.valueOf(type.toUpperCase())
        );
        return LikeList
                .builder()
                .summaryList(findList)
                .build();
    }

    @Transactional(readOnly = true)
    public List<Like> findAllByAccountAndType(AccountDetails accountDetails, String type) {
        return likeRepository.findAllByAccountAndType(accountDetails.getAccount(), LikeType.valueOf(type));
    }

    /**
     * 사용자별 좋아요 항목을 유형에 따라 그룹화하여 조회
     */
    @Transactional(readOnly = true)
    public LikeListGroupByType findAllTypeGroupedByLikeType(AccountDetails accountDetails) {
        List<Like> likes = likeRepository.findAllByAccount(accountDetails.getAccount());

        return LikeListGroupByType
                .builder()
                .groupList(
                        likes.stream()
                                .collect(Collectors.groupingBy(Like::getType,Collectors.toList()))
                )
                .build();
    }

    // ======================= UTILITY METHODS ======================= //

    /**
     * 특정 대상에 대한 좋아요 존재 여부를 확인
     */
    public boolean existsLike(AccountDetails accountDetails, LikeType type, long targetId) {
        return likeRepository.existsByAccountAndTypeAndTargetId(
                accountDetails.getAccount(),
                type,
                targetId
        );
    }

    /**
     * 새로운 좋아요 엔티티 생성
     */
    private Like createLike(AccountDetails accountDetails, LikeInfo infoDto) {
        return Like.builder()
                .type(infoDto.type())
                .targetId(infoDto.targetId())
                .account(accountDetails.getAccount())
                .build();
    }
}
