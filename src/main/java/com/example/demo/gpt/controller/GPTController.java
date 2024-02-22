package com.example.demo.gpt.controller;


import com.example.demo.gpt.dto.GPTRequest;
import com.example.demo.gpt.dto.Message;
import com.example.demo.gpt.service.GPTService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;


@Slf4j
@RestController
@RequestMapping("/api/gpt")
@RequiredArgsConstructor
public class GPTController {

    private final GPTService gptService;

    @PostMapping("/chat")
    public Mono<String> chat(@Valid @RequestBody GPTRequest requestData) {
        return gptService.chat(requestData);
    }
}
