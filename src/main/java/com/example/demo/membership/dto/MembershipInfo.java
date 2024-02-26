package com.example.demo.membership.dto;

import com.example.demo.membership.entity.Membership;
import lombok.Builder;

@Builder
public record MembershipInfo(Membership info) {
}
