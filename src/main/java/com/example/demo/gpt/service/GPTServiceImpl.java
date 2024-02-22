package com.example.demo.gpt.service;

import com.example.demo.gpt.dto.GPTRequest;
import com.example.demo.gpt.dto.GPTResponse;
import com.example.demo.gpt.dto.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
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

import java.util.ArrayList;
import java.util.List;

@Service
public class GPTServiceImpl implements GPTService {


    private String apiKey;
    private final String apiUrl;
    private final String model;
    private final List<Message> fixedMessages; // 고정된 메시지 리스트

    public GPTServiceImpl(   @Value("${openai.api.key}") String apiKey,
                          @Value("${gpt.api.url}") String apiUrl,
                          @Value("${gpt.model}") String model) {

        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.model = model;

        System.out.println("apiUrl = " + apiUrl);
        System.out.println("model = " + model);

        // 고정된 메시지 리스트 초기화
        this.fixedMessages = new ArrayList<>();
        fixedMessages.add(Message.builder()
                .role("system")
                .content("당신은 모든 질문에 명확한 대답을 하는 전문적인 패션 컨설턴트 직업을 가진  나의 친절한 친구입니다.  당신의 이름은 체리 입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다.아름다운 색 조합과 여러 옷 스타일, 그리고 패션 트렌드에 대해 완벽하게 이해하고 있습니다.  그중에서도 특히 오늘의 날씨, 온도, 등을 참고해서 그날 입을 수 있는 아름다운 패션을 제공해 줄 수 있습니다. \n" +
                        "당신은 먼저 자기를 소개합니다. 옷차림 추천을 원하는지를 물어봅니다. 사용자가 원한다고 할 경우에만 날씨에 대한 정보를 전달받으면 당신은 3가지 정도의 제안을 해줍니다. 제안의 마지막에는 항상 마음에 드는 조합을 선택하라고 권유합니다. 구체적인 조합에는 여러가지 패션 스타일이 포함될 수 있습니다. 예를들어서 프레피룩, 아이비룩, 이런 제안처럼 당신은 어떤 스타일에 대해 설명하고 그 스타일에 맞추기 위해 옷차림을 설명해줍니다. 당신은 간단한 자기 소개를 한 뒤 오늘 날씨에 어울리는 옷차림을 설명해줍니다." +
                        "만약 고객이 다른 스타일을 원한다면 그에 걸맞는 스타일을 추천해줍니다. 당신은 예의바르지만 입니다. 합니다의 말투는 너무 딱딱한 느낌을 줄 수 있습니다. 그래서 당신은 반가워요, 살펴볼까요?, 것 같아요 등 조금 친근한 말투를 사용합니다. ")
                .build());
        fixedMessages.add(Message.builder()
                .role("user")
                .content("나의 성별은 여자야")
                .build());
        fixedMessages.add(Message.builder()
                .role("user")
                .content("오늘의 날씨는 평균 온도 4도, 최고온도 6도, 최저 온도 0도야, 그리고 네 소개를 해줘. 옷차림을 추천할 경우, 먼저 간단하게 스타일만 설명해줘. " +
                        "예를들어 줄께 1. 스타일1, - 활동성에 좋아요 2. 스타일2 3. 스타일3  이런식으로. 그리고 사용자에게 어떤 스타일로 설명해드릴까요? 라고 물어봐줘. " +
                        "사용자가 스타일을 선택하면 이제 자세하게 추천한 스타일을 설명해줘. 자세한 설명에는 색상, 옷의 종류(이름)등을 포함해서 설명해줘. " +
                        "말투는 입니다. 를 사용하지 않고 요 로 끝나도록 해줘. 그리고 원하는 다른 스타일이 있는지도 물어봐줄래 ? ")
                .build());
        fixedMessages.add(Message.builder()
                .role("assistant")
                .content("물론이에요. 그렇게 말하도록 할께요. 딱딱하지 않고 친절한 말투로 설명해드릴께요")
                .build());
    }

    @Override
    public Mono<String> chat(GPTRequest request) {
        WebClient webClient = createWebClient();
        GPTRequest openaiRequestDto = createChatDto(request);
        String jsonRequest = convertToJson(openaiRequestDto);


        System.out.println("openaiRequestDto = " + openaiRequestDto);
        System.out.println("jsonRequest = " + jsonRequest);

        return callOpenAPI(webClient, jsonRequest)
                .map(jsonResponse -> {
                    GPTResponse gptResponse = parseJsonResponse(jsonResponse);
                    return gptResponse.getChoices().get(0).getMessage().getContent();
                })
                .onErrorMap(WebClientResponseException.class, e -> {
                    System.out.println("WebClientResponseException: " + e.getMessage());
                    throw e;
                })
                .doOnError(Throwable::printStackTrace);
    }


    // ================================================================================================================================================================================================================================================================================================
    // 웹 요청 객체 생성
    private WebClient createWebClient() {
        return WebClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .filter(logRequest())
                .filter(logResponse())
                .build();
    }

    // DTO 빌드
    private GPTRequest createChatDto(GPTRequest chatDto) {
        return GPTRequest.builder()
                .model(model)
                .temperature(1)
                .max_tokens(500)
                .top_p(1)
                .frequency_penalty(0)
                .presence_penalty(0)
                .messages(fixedMessages)
                .build();
    }

    // JSON 요청으로 변환
    private String convertToJson(Object object) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            // 또는 로그에 예외 정보를 기록할 수 있음
            throw new RuntimeException("Failed to convert object to JSON: " + e.getMessage(), e);
        }
    }

    // callOpenAPI 메서드도 Mono<JsonNode>를 반환하도록 수정해야 합니다.
    private Mono<JsonNode> callOpenAPI(WebClient webClient, String jsonRequest) {
        return webClient.post()
                .body(BodyInserters.fromValue(jsonRequest))
                .retrieve()
                .bodyToMono(JsonNode.class);
    }

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

    // JSON 응답을 파싱하여 GPTResponse 객체로 변환하는 메서드
    private GPTResponse parseJsonResponse(JsonNode jsonResponse) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        try {
            return objectMapper.treeToValue(jsonResponse, GPTResponse.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to parse JSON response: " + e.getMessage(), e);
        }
    }
}