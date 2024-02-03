package com.example.demo.ai_image.service;

import com.example.demo.ai_image.dto.AI_ImageDto;
import com.example.demo.ai_image.dto.AI_ImageRequestDto;
import com.example.demo.ai_image.dto.AI_ImageResponseDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;


@Service
public class AI_ImageServiceImpl implements AI_ImageService {
    String prompt_1 = "An informative style guide showcasing preppy fashion worn by a stylish South Asian woman. She is attired in a fashionable ensemble composed of preppy tops, bottoms, shoes, and accessories. There are additional garments surrounding her which can be exchanged to match her personal style. Every piece of attire is labelled in English, offering a detailed understanding of current chic fashion trends.";

    @Value("${openai.api.key}")
    private String openaiApiKey; // application.properties 또는 application.yml에서 설정한 OpenAI API 키

    // OpenAI API 호출 및 응답 처리 로직 구현
    @Override
    public Object  generateImage(AI_ImageRequestDto imageDto) {

        // OpenAI API 호출을 위한 WebClient 생성
        WebClient webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1/images/generations")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + openaiApiKey)
                .filter(logRequest())
                .filter(logResponse())
                .build();


        // OpenAI API에 보낼 요청 데이터 생성
        AI_ImageRequestDto openaiRequestDto = AI_ImageRequestDto.withDefaults()
                .toBuilder()
                .prompt(prompt_1)
                .build();

        // ObjectMapper를 사용하여 객체를 JSON 문자열로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String jsonRequest = objectMapper.writeValueAsString(openaiRequestDto);
            System.out.println("openaiRequestDto = " + jsonRequest);

            // OpenAI API 호출 및 응답 처리
            JsonNode jsonResponse = webClient.post()
                    .body(BodyInserters.fromValue(jsonRequest))
                    .retrieve()
                    .bodyToMono(JsonNode.class)  // 응답을 JsonNode로 받음
                    .block();

            System.out.println("jsonResponse = " + jsonResponse.toString());

            // 응답 받은 json 데이터  프론트에 반환
            return jsonResponse;
        } catch (WebClientResponseException e) {
            // WebClientResponseException 발생 시 추가 정보 출력
            System.out.println("WebClientResponseException: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            return null; // 예외 발생 시 null 반환
        }
    }

    // Request 로깅 필터
    private ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
            System.out.println("Request: " + clientRequest.method() + " " + clientRequest.url());
            clientRequest.headers().forEach((name, values) -> values.forEach(value -> System.out.println(name + ": " + value)));
            return Mono.just(clientRequest);
        });
    }

    // Response 로깅 필터
    private ExchangeFilterFunction logResponse() {
        return ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
            System.out.println("==========================================================================================================================");
            System.out.println("Response: " + clientResponse.statusCode());
            clientResponse.headers().asHttpHeaders().forEach((name, values) -> values.forEach(value -> System.out.println(name + ": " + value)));
            // 응답 데이터를 가져와서 출력
            return Mono.just(clientResponse);
//            return clientResponse.bodyToMono(String.class)
//                    .doOnNext(body -> System.out.println("Response Body: " + body))
//                    .map(body -> clientResponse);
        });
    }
}