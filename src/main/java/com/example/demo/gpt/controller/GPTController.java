package com.example.demo.gpt.controller;


import com.example.demo.gpt.dto.ChatRequest;
import com.example.demo.gpt.service.GPTService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;


@Slf4j
@RestController
@RequestMapping("/api/gpt")
@RequiredArgsConstructor
public class GPTController {

    private final GPTService gptService;

    @PostMapping("/chat")
    public Mono<String> chat(@Valid @RequestBody ChatRequest requestData) {
        return gptService.chat(requestData);
    }

    @GetMapping("/chat")
    public ResponseEntity<String> startChat() {
        gptService.startNewChatSession();
        return ResponseEntity.ok("New chat session started.");
    }
}
