package com.example.demo.gpt.controller;


import com.example.demo.gpt.dto.GPTRequest;
import com.example.demo.gpt.dto.GPTResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RestController
@RequestMapping("/api/gpt")
@RequiredArgsConstructor
public class GPTController {

    @Value("${gpt.model}")
    private String model;

    @Value("${gpt.api.url}")
    private String apiUrl;

    private final RestTemplate gptRestTemplate;

    @Value("${openai.api.key}")
    private String apiKey;



    @GetMapping("/chat")
    public String chat(@RequestParam("prompt") String prompt){

        GPTRequest request = new GPTRequest(
                model,prompt,1,500,1,0,0);

        GPTResponse gptResponse = gptRestTemplate.postForObject(
                apiUrl
                , request
                , GPTResponse.class
        );

        System.out.println("gptResponse = " + gptResponse);
        return gptResponse.getChoices().get(0).getMessage().getContent();


    }
}
