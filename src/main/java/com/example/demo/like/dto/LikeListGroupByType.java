package com.example.demo.like.dto;

import com.example.demo.like.entity.Like;
import com.example.demo.like.enums.LikeType;
import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record LikeListGroupByType(Map<LikeType, List<Like>> groupList) {
}
