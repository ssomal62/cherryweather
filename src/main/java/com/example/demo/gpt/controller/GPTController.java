package com.example.demo.gpt.controller;


import com.example.demo.gpt.dto.GPTRequest;
import com.example.demo.gpt.service.GPTService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/gpt")
@RequiredArgsConstructor
public class GPTController {

    private final GPTService gptService;

    @PostMapping("/chat")
    public String chat(@RequestBody GPTRequest request) {
        return gptService.chat(request);
    }
}
