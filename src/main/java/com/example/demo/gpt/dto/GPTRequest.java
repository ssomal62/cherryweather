package com.example.demo.gpt.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import static com.example.demo.gpt.utils.MessageUtils.createMessageFromJson;

@Getter
@Setter
@NoArgsConstructor
public class GPTRequest {
    private List<Message> userMessages;
    private List<Message> assistantMessages;
    private List<Message> fixedMessages; // fixedMessages 필드 추가

    private String model;
    private List<Message> messages;
    private int temperature;
    private int max_tokens;
    private int top_p;
    private int frequency_penalty;
    private int presence_penalty;
    private int userIndex = 0;
    private int assistantIndex = 0;

    @Builder
    public GPTRequest(String model, List<Message> messages, int temperature,
                      int max_tokens, int top_p, int frequency_penalty, int presence_penalty,
                      List<Message> fixedMessages) {
        this.model = model;
        this.messages = messages;
        this.temperature = temperature;
        this.max_tokens = max_tokens;
        this.top_p = top_p;
        this.frequency_penalty = frequency_penalty;
        this.presence_penalty = presence_penalty;
        this.fixedMessages = fixedMessages; // 생성자에서 fixedMessages 초기화
    }

    public GPTRequest ToRequestDtoForAPI(GPTRequest requestData) {

        //데이터추출
        List<Message> userMessages = requestData.getUserMessages();
        List<Message> assistantMessages = requestData.getAssistantMessages(); // assistantMessages로 변경


        // 새로운 객체를 생성하여 기존의 messages에 chatList를 추가하여 반환
        List<Message> newMessages = new ArrayList<>();
        System.out.println("newMessages = " + newMessages);


        // 유저 메시지나 어시스턴트 메시지 중 하나라도 리스트에 요소가 남아 있는 동안 반복
        while (userIndex < userMessages.size() || assistantIndex < assistantMessages.size()) {
            // 유저 메시지가 남아 있는 경우 리스트에 추가
            if (userIndex < userMessages.size()) {
                Message userMessage = createMessageFromJson(String.valueOf(userMessages.get(userIndex++)));
                newMessages.add(new Message("user", userMessage.getContent()));
            }

            // 어시스턴트 메시지가 남아 있는 경우 리스트에 추가
            if (assistantIndex < assistantMessages.size()) {
                Message assistantMessage = createMessageFromJson(String.valueOf(assistantMessages.get(assistantIndex++)));
                newMessages.add(new Message("assistant", assistantMessage.getContent()));
            }
        }

        // fixedMessages를 새로운 메시지 리스트의 가장 앞에 추가
        newMessages.addAll(0, fixedMessages);

        // 빌더를 사용하여 메시지 리스트와 고정된 값들을 설정
        GPTRequestBuilder builder = GPTRequest.builder()
                .model(this.model)
                .temperature(1)
                .max_tokens(500)
                .top_p(1)
                .frequency_penalty(0)
                .presence_penalty(0)
                .messages(newMessages);

        return builder.build();
    }
}