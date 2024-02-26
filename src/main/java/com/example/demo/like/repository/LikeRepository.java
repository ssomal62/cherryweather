package com.example.demo.like.repository;

import com.example.demo.account.entity.Account;
import com.example.demo.like.entity.Like;
import com.example.demo.like.enums.LikeType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {

    List<Like> findAllByAccount(Account accountId);
    List<Like> findAllByAccountAndType(Account account, LikeType likeType);
    boolean existsByAccountAndTypeAndTargetId(Account account, LikeType type, long targetId);
    void deleteByAccountAndTypeAndTargetId(Account account, LikeType type, long targetId);

}
