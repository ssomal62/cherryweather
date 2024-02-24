package com.example.demo.like.dto;

import com.example.demo.like.enums.LikeType;

public record LikeInfo(
        LikeType type,
        long targetId
) {


}
