package com.example.demo.feed.utils;

import com.example.demo.feed.entity.Feed;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class FeedValidator {

    private final Feed feed;

    @Getter
    private final List<String> errors = new ArrayList<>();

    public static FeedValidator of(Feed feed) {
        return new FeedValidator(feed);
    }

    public boolean isValid() {
        return errors.isEmpty();
    }

    public FeedValidator validateUserName() {
        if (feed.getUserName() == null || feed.getUserName().trim().isEmpty()) {
            errors.add("[userName]은 공백일 수 없습니다.");
        }
        return this;
    }

    public FeedValidator validateContent() {
        if (feed.getContent() == null || feed.getContent().trim().isEmpty()) {
            errors.add("[content]은 공백일 수 없습니다.");
        }
        return this;
    }

    public FeedValidator validateWeather() {
        if (feed.getWeather() == null || feed.getWeather().trim().isEmpty()) {
            errors.add("[weather]는 공백일 수 없습니다.");
        }
        return this;
    }

    public FeedValidator validateIsPublic() {
        // Here, we assume isPublic doesn't need validation because it's a boolean.
        // If you had more complex validation logic, you could add it here.
        return this;
    }

    // Add any other validations specific to your Feed entity here.
}
