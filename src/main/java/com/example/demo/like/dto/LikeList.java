package com.example.demo.like.dto;

import com.example.demo.like.entity.Like;
import lombok.Builder;

import java.util.List;

@Builder
public record LikeList (List<Like> summaryList) {
}
