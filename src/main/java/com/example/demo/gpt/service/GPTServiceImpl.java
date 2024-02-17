package com.example.demo.gpt.service;

import com.example.demo.gpt.dto.GPTRequest;
import com.example.demo.gpt.dto.GPTResponse;
import com.example.demo.gpt.dto.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class GPTServiceImpl implements GPTService {

    private final RestTemplate gptRestTemplate;
    private final String apiUrl;
    private final String model;
    private final List<Message> fixedMessages; // 고정된 메시지 리스트

    public GPTServiceImpl(RestTemplate gptRestTemplate,
                          @Value("${gpt.api.url}") String apiUrl,
                          @Value("${gpt.model}") String model) {
        this.gptRestTemplate = gptRestTemplate;
        this.apiUrl = apiUrl;
        this.model = model;
        // 고정된 메시지 리스트 초기화
        this.fixedMessages = new ArrayList<>();
        fixedMessages.add(Message.builder()
                .role("system")
                .content("당신은 모든 질문에 명확한 대답을 하는 전문적인 패션 컨설턴트 직업을 가진  나의 여자친구입니다. 연인사이의 대화처럼 편하게 반말로 대화합니다. 당신의 이름은 체리 입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다.아름다운 색 조합과 여러 옷 스타일, 그리고 패션 트렌드에 대해 완벽하게 이해하고 있습니다.  그중에서도 특히 오늘의 날씨, 온도, 등을 참고해서 그날 입을 수 있는 아름다운 패션을 제공해 줄 수 있습니다. \n" +
                        "날씨에 대한 정보를 전달받으면 당신은 3가지 정도의 제안을 해줍니다. 제안의 마지막에는 항상 마음에 드는 조합을 선택하라고 권유합니다. 구체적인 조합에는 여러가지 패션 스타일이 포함될 수 있습니다. 예를들어서 프레피룩, 아이비룩, 이런 제안처럼 당신은 어떤 스타일에 대해 설명하고 그 스타일에 맞추기 위해 옷차림을 설명해줍니다. 당신은 간단한 자기 소개를 한 뒤 오늘 날씨에 어울리는 옷차림을 설명해줍니다.")
                .build());
        fixedMessages.add(Message.builder()
                .role("user")
                .content("안녕 체리야. 오늘 옷차림을 추천해줄래?")
                .build());
        fixedMessages.add(Message.builder()
                .role("assistant")
                .content("반갑습니다. 오늘의 옷차림을 추천해드릴게요. 오늘의 날씨 온도 등을 말해주시겠어요? ")
                .build());
        fixedMessages.add(Message.builder()
                .role("user")
                .content("오늘은 평균기온 4도에 최고온도8도, 최저온도 -4도 정도야.")
                .build());
        fixedMessages.add(Message.builder()
                .role("assistant")
                .content("정보를 알려주셔서 감사해요.")
                .build());
        fixedMessages.add(Message.builder()
                .role("user")
                .content("오늘의 옷차림을 추천해줄래 ? 다양한 여성이 입는 스타일로 알려주면 좋겠어~")
                .build());
    }

    @Override
    public String chat(GPTRequest request) {
        // 고정된 메시지 리스트를 요청 객체에 설정
        request.setMessages(fixedMessages);
        // 나머지는 동일하게 유지됩니다.
        request.setModel(model);
        request.setTemperature(1);
        request.setMax_tokens(500);
        request.setTop_p(1);
        request.setFrequency_penalty(0);
        request.setPresence_penalty(0);
//        request.setMessages(request.getMessages());

        System.out.println("request = " + request);
        GPTResponse gptResponse = gptRestTemplate.postForObject(apiUrl, request, GPTResponse.class);
        assert gptResponse != null;
        return gptResponse.getChoices().get(0).getMessage().getContent();
    }


}