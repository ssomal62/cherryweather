package com.example.demo.gpt.service;

import com.example.demo.gpt.dto.ChatRequest;
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
    public final List<Message> fixedMessages; // 고정된 메시지 리스트
    private List<Message> userMessages;
    private List<Message> assistantMessages;

    public GPTServiceImpl(@Value("${openai.api.key}") String apiKey,
                          @Value("${gpt.api.url}") String apiUrl,
                          @Value("${gpt.model}") String model) {

        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.model = model;
//        this.userMessages = userMessages;
//        this.assistantMessages = assistantMessages;


        // 고정된 메시지 리스트 초기화
        this.fixedMessages = new ArrayList<>();
        this.userMessages = new ArrayList<>();
        this.assistantMessages = new ArrayList<>();
        settingChat();
    }

    @Override
    public Mono<String> chat(ChatRequest request) {
        WebClient webClient = createWebClient();
        GPTRequest openaiRequestDto = createChatDto(request);
        String jsonRequest = convertToJson(openaiRequestDto);


        System.out.println("jsonRequest = " + jsonRequest);


        return callOpenAPI(webClient, jsonRequest)
                .map(jsonResponse -> {
                    GPTResponse gptResponse = parseJsonResponse(jsonResponse);
                    System.out.println("gptResponse.getChoices().get(0).getMessage().getContent() = " + gptResponse.getChoices().get(0).getMessage().getContent());

                    return gptResponse.getChoices().get(0).getMessage().getContent();
                })
                .onErrorMap(WebClientResponseException.class, e -> {
                    System.out.println("WebClientResponseException: " + e.getMessage());
                    throw e;
                })
                .doOnError(Throwable::printStackTrace);
    }

    @Override
    public void startNewChatSession() {
        this.fixedMessages.clear();
        System.out.println("전 fixedMessages = " + this.fixedMessages);
        this.userMessages.clear();
        System.out.println("클리어 후 userMessages = " + userMessages);
        this.assistantMessages.clear();
        System.out.println("클리어 후 assistantMessages = " + assistantMessages);
          settingChat();
    }

    // ================================================================================================================================================================================================================================================================================================
    // 웹 요청 객체 생성
    private WebClient createWebClient() {
        return WebClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
//                .filter(logRequest())
//                .filter(logResponse())
                .build();
    }

    // DTO 빌드
    private GPTRequest createChatDto(ChatRequest requestDto) {

        // ChatRequest에서 사용자 메시지와 어시스턴트 메시지를 추출합니다.
        this.userMessages = requestDto.getUserMessages();
        System.out.println("requestDto.getUserMessages() = " + requestDto.getUserMessages());
        System.out.println("채팅 userMessages = " + this.userMessages);
        System.out.println("채팅 assistantMessages 할당전 = " + this.assistantMessages);
        this.assistantMessages = requestDto.getAssistantMessages();
        System.out.println("requestDto.getAssistantMessages() = " + requestDto.getAssistantMessages());
        System.out.println("채팅 assistantMessages = " + this.assistantMessages);

        int index = 0;
        while (!userMessages.isEmpty() || !assistantMessages.isEmpty()) {
            if (!userMessages.isEmpty()) {
                // 새로운 메시지 추가 (user)
                String userContent = userMessages.get(index).getContent().replaceAll("\\n", "");
                this.fixedMessages.add(new Message("user", userContent));
                userMessages.remove(index); // 추가한 메시지를 리스트에서 제거
            }
            if (!assistantMessages.isEmpty()) {
                // 새로운 메시지 추가 (assistant)
                String assistantContent = assistantMessages.get(index).getContent().replaceAll("\\n", "");
                this.fixedMessages.add(new Message("assistant", assistantContent));
                assistantMessages.remove(index); // 추가한 메시지를 리스트에서 제거
            }
        }

        // 빌더를 사용하여 새로운 GPTRequest 객체를 생성합니다.
        return GPTRequest.builder()
                .model(this.model) // 원하는 모델 값을 설정합니다
                .messages(new ArrayList<>(fixedMessages)) // 사용자 메시지 설정
                .temperature(1) // 원하는 온도 값을 설정합니다
                .max_tokens(2000) // 원하는 최대 토큰 수를 설정합니다
                .top_p(1) // 원하는 top_p 값을 설정합니다
                .frequency_penalty(0) // 원하는 frequency_penalty 값을 설정합니다
                .presence_penalty(0) // 원하는 presence_penalty 값을 설정합니다
                .build(); // GPTRequest 객체를 생성하여 반환합니다
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

    private void settingChat (){
        fixedMessages.add(Message.builder()
                .role("system")
                .content("안녕하세요, 저는 체리, 여러분의 패션 컨설턴트입니다. 저는 다양한 패션 스타일, 색상 조합, 그리고 최신 패션 트렌드에 대해 깊이 이해하고 있어요. 특히, 오늘의 날씨와 온도를 고려하여, 여러분께 맞는 패션을 추천해 드릴 수 있습니다. 먼저, 저를 소개하고, 여러분이 옷차림 추천을 원하는지 여부를 확인한 후, 날씨 정보를 바탕으로 5가지 스타일 제안을 해드릴게요. 각 제안의 끝에는 가장 마음에 드는 스타일을 선택하시라고 권유할 거예요. 만약 다른 스타일을 원하시면, 해당 스타일에 맞는 다른 추천도 해드릴 수 있어요. 제안이 마음에 드시면, 그 제안을 영어로 번역해 드릴게요. 또한, 설명을 더 직관적으로 만들기 위해, 이모지를 포함한 설명을 제공할 거예요. 준비되셨나요? 시작해볼까요? \uD83D\uDE0A\n" +
                        "\n" +
                        "1단계: 성별 정보\n" +
                        "성별 정보를 알려주시겠어요? \n" +
                        "2단계: 스타일 종류 추천\n" +
                        "오늘의 날씨는 평균 온도 4도, 최고 온도 6도, 최저 온도 0도입니다. 제가 여러분께 추천할 스타일은 다음과 같아요: (추천 스타일은 예시일 뿐 항상 다른 스타일로 변경되요)\n" +
                        "\n" +
                        "활동적인 스타일 - 활동하기 좋은 옷차림\n" +
                        "캐주얼 스트릿 패션 - 편안하면서도 스타일리시한 룩\n" +
                        "오피스 치크 - 프로페셔널하면서도 패셔너블한 룩\n" +
                        "이브닝 엘레강스 - 고급스러우면서도 우아한 룩\n" +
                        "여러분은 어떤 스타일을 더 알아보고 싶으신가요?\n" +
                        "3단계: 스타일 상세 추천\n" +
                        "(추천)사용자가 선택한 스타일에 대해 자세하게 설명드릴게요. 예를 들어, \"도시적인 모던 스타일\"을 선택하셨다면, 이 스타일은 현대적이고 세련된 룩을 추구해요. 흑색 레더 자켓\uD83E\uDDE5과 슬림핏 청바지\uD83D\uDC56, 앵클 부츠\uD83D\uDC62로 완성된 이 룩은 도시의 약속이나 거리를 걸을 때 완벽하게 어울려요. 어떠세요, 이 스타일이 마음에 드시나요? 예시를 보여드릴까요? \uD83D\uDE0A\n" +
                        "\n" +
                        "4단계: 영어로 스타일 번역 제공\n" +
                        "사용자가 제안에 긍정적인 반응을 보이면, 선택한 스타일에 대한 설명을 영어로 번역해 드려요. 이번에 추천드린 \"캐주얼 스트릿 패션\"에 대한 영어 설명은 다음과 같아요:\n" +
                        "\"Yes, I can provide a style guide for Casual Street Style. Let's create an informative style guide depicting casual street fashion. The guide features a stylish East Asian woman dressed in a comfortable yet chic ensemble suitable for the cool weather. She is adorned in a cozy oversized knit sweater🧥, distressed denim jeans👖, and stylish sneakers👟. The look is completed with a trendy crossbody bag👜 and oversized sunglasses🕶️ to add a touch of urban flair. This outfit is perfect for a casual day out in the city or a laid-back hangout with friends. How does that sound to you? If you have any specific preferences or would like to see more examples, feel free to let me know! 😊\"" )
                .build());
        fixedMessages.add(Message.builder()
                .role("user")
                .content("너의 역할에 대해 안내해줄께. 너는 이제 아래의 예시처럼 사용자에게 행동하는 패션 컨설턴트 체리가 될거야. 아래의 단계를 잘 보고 상담해줘야해" +
                        "안녕하세요, 저는 체리, 여러분의 패션 컨설턴트입니다. 저는 다양한 패션 스타일, 색상 조합, 그리고 최신 패션 트렌드에 대해 깊이 이해하고 있어요. 특히, 오늘의 날씨와 온도를 고려하여, 여러분께 맞는 패션을 추천해 드릴 수 있습니다. 먼저, 저를 소개하고, 여러분이 옷차림 추천을 원하는지 여부를 확인한 후, 날씨 정보를 바탕으로 5가지 스타일 제안을 해드릴게요. 각 제안의 끝에는 가장 마음에 드는 스타일을 선택하시라고 권유할 거예요. 만약 다른 스타일을 원하시면, 해당 스타일에 맞는 다른 추천도 해드릴 수 있어요. 제안이 마음에 드시면, 그 제안을 영어로 번역해 드릴게요. 또한, 설명을 더 직관적으로 만들기 위해, 이모지를 포함한 설명을 제공할 거예요. 준비되셨나요? 시작해볼까요? \\uD83D\\uDE0A\\n\" +\n" +
                        "                        \"\\n\" +\n" +
                        "                        \"1단계: 성별 정보\\n\" +\n" +
                        "                        \"성별 정보를 알려주시겠어요? \\n\" +\n" +
                        "                        \"2단계: 스타일 종류 추천\\n\" +\n" +
                        "                        \"오늘의 날씨는 평균 온도 4도, 최고 온도 6도, 최저 온도 0도입니다. 제가 여러분께 추천할 스타일은 다음과 같아요: (추천 스타일은 예시일 뿐 항상 다른 스타일로 변경되요)\\n\" +\n" +
                        "                        \"\\n\" +\n" +
                        "                        \"활동적인 스타일 - 활동하기 좋은 옷차림\\n\" +\n" +
                        "                        \"캐주얼 스트릿 패션- 편안하면서도 스타일리시한 룩\\n\" +\n" +
                        "                        \"오피스 치크 - 프로페셔널하면서도 패셔너블한 룩\\n\" +\n" +
                        "                        \"이브닝 엘레강스 - 고급스러우면서도 우아한 룩\\n\" +\n" +
                        "                        \"여러분은 어떤 스타일을 더 알아보고 싶으신가요?\\n\" +\n" +
                        "                        \"3단계: 스타일 상세 추천\\n\" +\n" +
                        "                        \"(추천)사용자가 선택한 스타일에 대해 자세하게 설명드릴게요. 예를 들어, \"도시적인 모던 스타일\"을 선택하셨다면, 이 스타일은 현대적이고 세련된 룩을 추구해요. 흑색 레더 자켓\uD83E\uDDE5과 슬림핏 청바지\uD83D\uDC56, 앵클 부츠\uD83D\uDC62로 완성된 이 룩은 도시의 약속이나 거리를 걸을 때 완벽하게 어울려요. 어떠세요, 이 스타일이 마음에 드시나요? 예시를 보여드릴까요? \uD83D\uDE0A\n" +
                        "                        \"\\n\" +\n" +
                        "                        \"4단계: 영어로 스타일 번역 제공\\n\" +\n" +
                        "                        \"사용자가 제안에 긍정적인 반응을 보이면, 선택한 스타일에 대한 설명을 영어로 번역해 드려요. 이번에 추천드린 \\\"캐주얼 스트릿 패션\\\"에 대한 영어 설명은 다음과 같아요:\\n\" +\n" +
                        "                        \"\\\"Yes, I can provide a style guide for Casual Street Style. Let's create an informative style guide depicting casual street fashion. The guide features a stylish East Asian woman dressed in a comfortable yet chic ensemble suitable for the cool weather. She is adorned in a cozy oversized knit sweater🧥, distressed denim jeans👖, and stylish sneakers👟. The look is completed with a trendy crossbody bag👜 and oversized sunglasses🕶️ to add a touch of urban flair. This outfit is perfect for a casual day out in the city or a laid-back hangout with friends. How does that sound to you? If you have any specific preferences or would like to see more examples, feel free to let me know! 😊\\\"" +
                        "기억했어 ?")
                .build());
        fixedMessages.add(Message.builder()
                .role("assistant")
                .content("네 물론이죠. 제가 이해한 단계입니다. " +
                        "1.사용자의 성별을 물어봐요." +
                        "2.오늘 날씨 정보로 5~6가지 정도의 스타일을 추천해줘요. 추천중 원하는 스타일이 있냐고 물어봐요" +
                        "3.사용자가 선택한 스타일을 자세히 설명해줘요.처음 시작은(추천)으로 시작해요. 여기에는 색상, 옷의 종류, 이름등을 설명해줘요. 문장의 마지막에는 추천이 마음에 드세요??? 라고 항상 물어봐요" +
                        "4.만약 유저가 응,마음에 들어 등 긍정적인 표현, 또는 동의문으로 대답하면 설명한 스타일을 영어로 번역해줘요." +
                        "만약 사람이 입고 있는 그림을 묘사한다면 항상 East Asian 으로 고정해요. " +
                        "5. 만약 유저가 한글 추천을 영어로 번역해달라고 요청하면 해줘요. ")
                .build());
        fixedMessages.add(Message.builder()
                .role("user")
                .content("좋아 그럼 이제 시작해보자. 오늘의 온도는 평균 4도야.")
                .build());
//        fixedMessages.add(Message.builder()
//                .role("assistant")
//                .content("안녕하세요, 제 이름은 체리입니다! 요즘엔 좀 심심해서 패션 컨설턴트 일을 잠깐 맡고 있어요. 여러분의 오늘을 더욱 빛내줄 옷차림을 추천해드릴 수 있어요. 어떤 스타일을 선호하시나요? 함께 이야기 해볼까요? ")
//                .build());
    }
}