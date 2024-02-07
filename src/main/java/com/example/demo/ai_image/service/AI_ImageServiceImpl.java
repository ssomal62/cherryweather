package com.example.demo.ai_image.service;

import com.example.demo.ai_image.dto.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AI_ImageServiceImpl implements AI_ImageService {

    private final AI_FileService aiFileService;
    private final ImageUploader imageUploader;
    String prompt_1 = "An informative style guide showcasing preppy fashion worn by a stylish South Asian woman. She is attired in a fashionable ensemble composed of preppy tops, bottoms, shoes, and accessories. There are additional garments surrounding her which can be exchanged to match her personal style. Every piece of attire is labelled in English, offering a detailed understanding of current chic fashion trends.";
    String cold_weather = "In chilly temperatures, our fashionista stays cozy yet chic. She opts for a classic cable-knit sweater in rich burgundy, paired with tailored plaid trousers. Knee-high leather boots add a touch of sophistication while keeping her warm. A woolen beret and a matching scarf complete the ensemble, creating a polished winter look.";
    String cool_weather = "As the mercury rises slightly, our fashion-forward South Asian woman embraces a lighter preppy style. She layers a pastel-colored button-down shirt under a V-neck sweater, paired with slim-fit chinos. Loafer shoes in a complementary hue elevate the outfit. A delicate statement necklace and a wristwatch add subtle touches of glam to the ensemble.";
    String mild_weather = "In mild temperatures, our stylish icon effortlessly combines comfort and preppy flair. She dons a crisp, short-sleeved polo shirt with high-waisted tailored shorts. White sneakers provide a sporty yet refined touch. A crossbody bag and oversized sunglasses complete the look, offering both practicality and a dash of glamour.";
    String warm_weather = "As the sun shines brighter, our South Asian trendsetter opts for a sleeveless A-line dress in a playful print. A wide-brimmed hat and espadrille sandals exude summer vibes while maintaining preppy elegance. A thin leather belt cinches the waist for a flattering silhouette. Sunglasses and a stack of bracelets add a final touch of flair. The image showcases additional clothing pieces with English labels, providing a comprehensive range of options for creating a personalized and trendy look.";
    String hot_weather = "In soaring temperatures, our fashion-savvy woman embraces a preppy look with lightweight fabrics. She chooses a breezy off-the-shoulder top paired with wide-leg culottes. Slip-on canvas sneakers offer both style and comfort. A floppy hat and a woven tote bag complete the ensemble, ensuring she stays cool and chic in the heat. The image surrounding her features an assortment of extra garments, each labeled in English, facilitating the exploration of diverse style combinations that align with individual preferences.";

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
                .prompt(hot_weather)
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

    @Override
    public void deleteByUrl(ImageDeleteRequestDto requestDto) {
        System.out.println("requestDto.getUrl() = " + requestDto.getUrl());
        System.out.println(" requestDto.getUserId() = " + requestDto.getUserId());
        aiFileService.deleteSingleFile(requestDto.getUrl(),requestDto.getUserId());
    }

    @Override
    public void uploadImage(ImageUploadRequestDto requestDto) {
        imageUploader.uploadImageToBucket(requestDto);
    }

    @Override
    public AI_ImageResponseDto getImageByUserId(String userId) {
        return null;
    }


//    String imageUrl = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-PZHIu8jfYhaEttFnynfgZQo8/user-62BoikHqBYo2UbDNqlIz8cnr/img-iVZrRz4TdE2R0u8Eb4pUiMTr.png";
//    String dirName = "user_ID";  // 업로드할 디렉토리 이름

    //private 메소드
    // ================================================================================================================================================================================================================================================================================================
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