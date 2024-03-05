package com.example.demo.ai_image.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.entity.Account;
import com.example.demo.account.repository.AccountRepository;
import com.example.demo.account.service.impl.AccountServiceImpl;
import com.example.demo.ai_image.dto.generate.generateRequestDto;
import com.example.demo.ai_image.dto.delete.ImageDeleteRequestDto;
import com.example.demo.ai_image.dto.upload.ImageUploadRequestDto;
import com.example.demo.ai_image.entity.AI_image;
import com.example.demo.ai_image.repository.AI_imageRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class AI_imageServiceImp implements AI_imageService {

    private final AI_fileService aiFileService;
    private final ImageUploader imageUploader;
    private final AI_imageRepository aiImageRepository;
    private final AccountRepository accountRepository;
    private final AccountServiceImpl accountService;

    @Value("${openai.api.key}")
    private String openaiApiKey; // application.properties 또는 application.yml에서 설정한 OpenAI API 키

    // OpenAI API 호출 및 응답 처리 로직 구현

    @Override
    public Object generateImage(AccountDetails accountDetails, generateRequestDto imageDto) {
        WebClient webClient = createWebClient();
        generateRequestDto openaiRequestDto = createOpenAIRequestDto(imageDto);
        String jsonRequest = convertToJson(openaiRequestDto);


        System.out.println("openaiRequestDto = " + openaiRequestDto);
        System.out.println("jsonRequest = " + jsonRequest);

        try {
            JsonNode jsonResponse = callOpenAPI(webClient, jsonRequest);
            saveImageData(accountDetails.getAccount().getAccountId(), jsonResponse); // 이미지 데이터 저장
            return jsonResponse;
        } catch (WebClientResponseException e) {
            System.out.println("WebClientResponseException: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    @Transactional
    public void deleteByURL(AccountDetails accountDetails,ImageDeleteRequestDto requestDto) {
        System.out.println("requestDto.getUrl() = " + requestDto.getImageURL());
        System.out.println("accountDetails.getAccount().getEmail() = " + accountDetails.getAccount().getEmail());
        aiFileService.deleteSingleFile(requestDto.getImageURL(),accountDetails.getAccount().getEmail());

    }

    @Override
    public String uploadImage(AccountDetails accountDetails,ImageUploadRequestDto requestDto) {
        System.out.println("이미지 업로드 호출");
        String imageURL = requestDto.getImageURL();
        String bucketURL = imageUploader.uploadImageToBucket(accountDetails,requestDto);
        // AI_imageRepository를 사용하여 image_url이 imageUrl과 일치하는 엔티티를 찾음
        Optional<AI_image> aiImageOptional = aiImageRepository.findByImageURL(imageURL);
        aiImageOptional.ifPresent(aiImage -> {
            // 검색된 엔티티의 bucket_url 필드를 새 URL 값으로 업데이트
            aiImage.setBucketUrl(bucketURL);
            // 엔티티를 저장하여 업데이트 반영
            aiImageRepository.save(aiImage);
            aiImageRepository.updateCheckSaveByImageURL(requestDto.getImageURL());
            System.out.println("AI_image 엔티티의 bucket_url이 업데이트되었습니다.");
        });
        // JSON 형식의 문자열로 bucketURL 반환
        return "{\"bucketURL\":\"" + bucketURL + "\"}";
    }

    @Override
    public List<AI_image> getImageBucketURLByAccountID(Long accountid) {

        return aiImageRepository.getSavedUrlByAccountId(accountid);
    }

    @Override
    public List<AI_image> findAllImages() {
        return aiImageRepository.findAll();
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

    // ================================================================================================================================================================================================================================================================================================
    // 이미지 생성
    private WebClient createWebClient() {
        return WebClient.builder()
                .baseUrl("https://api.openai.com/v1/images/generations")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + openaiApiKey)
                .filter(logRequest())
                .filter(logResponse())
                .build();
    }

    private generateRequestDto createOpenAIRequestDto(generateRequestDto imageDto) {
        return generateRequestDto.builder()
                .model(imageDto.getModel())
                .n(imageDto.getN())
                .size(imageDto.getSize())
                .prompt(imageDto.getPrompt())
                .build();
    }

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

    private JsonNode callOpenAPI(WebClient webClient, String jsonRequest) {
        return webClient.post()
                .body(BodyInserters.fromValue(jsonRequest))
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();
    }

    private void saveImageData(Long accountId, JsonNode jsonResponse) {
        JsonNode dataNode = jsonResponse.get("data");
        String revisedPrompt = null;
        String imageUrl = null;

        // 이미지 데이터 추출
        for (JsonNode node : dataNode) {
            revisedPrompt = node.get("revised_prompt").asText();
            imageUrl = node.get("url").asText();
        }

        // 계정 정보 조회
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));

        // 이미지 정보 저장
        AI_image aiImage = AI_image.builder()
                .account(account)
                .prompt(revisedPrompt)
                .imageURL(imageUrl)
                .checkSave(false) // 이미지 저장 여부 체크
                .build();

        aiImageRepository.save(aiImage);
    }
}