package com.example.demo.club.utils;

import com.example.demo.club.entity.Club;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class ClubValidator {

    private final Club club;

    @Getter
    private final List<String> errors = new ArrayList<>();

    public static ClubValidator of(Club club) {
        return new ClubValidator(club);
    }

    public boolean isValid() {
        return errors.isEmpty();
    }

    public ClubValidator validateName() {
        if (club.getName() == null || club.getName().trim().isEmpty()) {
            errors.add("[name]은 공백일 수 없습니다.");
        }
        if (club.getName().length() > 20) {
            errors.add("[name]은 1자 이상 20자 이하여야 합니다.");
        }
        return this;
    }

    public ClubValidator validateCode() {
        if (club.getCode() == null || club.getCode().trim().isEmpty()) {
            errors.add("[code]는 공백일 수 없습니다.");
        }
        return this;
    }

    public ClubValidator validateActivityArea() {
        if (club.getActivitiesArea() != null && club.getActivitiesArea().trim().isEmpty()) {
            errors.add("[activitiesArea]는 공백일 수 없습니다.");
        }
        return this;
    }

    public ClubValidator validateCategory() {
        if (club.getCategory() == null) {
            errors.add("[category]는 null일 수 없습니다.");
        }
        return this;
    }

    public ClubValidator validateStatus() {
        if (club.getStatus() == null) {
            errors.add("[status]는 null일 수 없습니다.");
        }
        return this;
    }

}
