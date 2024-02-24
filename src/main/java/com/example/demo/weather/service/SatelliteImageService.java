package com.example.demo.weather.service;

import com.example.demo.weather.dto.SatelliteImageDto;
import com.example.demo.weather.exception.LookupException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static com.example.demo.weather.exception.enums.WeatherExeptionStatus.JSON_PARSING_FAILED;

@Service
@RequiredArgsConstructor
public class SatelliteImageService {

    private final RestTemplate restTemplate;

    private final String baseUrl = "https://apis.data.go.kr/1360000/SatlitImgInfoService/getInsightSatlit";

    @Value("${weather.kma.serviceKey}")
    private String serviceKey;

    public List<SatelliteImageDto> getSatelliteImage() {
        // 현재 UTC 날짜 및 시간
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        sdf.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
        String currentDate = sdf.format(new Date());

        System.out.println(currentDate);

        String url = String.format("%s?serviceKey=%s&pageNo=1&numOfRows=10&dataType=JSON&sat=G2&data=ir105&area=ko&time=%s", baseUrl, serviceKey, currentDate);

        System.out.println("url : " + url);

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return parseJsonToDto(response.getBody());
    }

    public List<SatelliteImageDto> parseJsonToDto(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode itemNode = root.path("response").path("body").path("items").path("item");

            List<SatelliteImageDto> satelliteImages = new ArrayList<>();

            for(JsonNode item : itemNode) {
                String imageString = item.path("satImgC-file").asText();

                // 이미지 URL을 ','로 분리하여 각각 Dto 객체로 생성
                List<String> urls = Arrays.asList(imageString.split(","));
                for(String url : urls) {
                    satelliteImages.add(SatelliteImageDto.builder()
                                                .satImg(url.trim().replaceAll("^\\[|\\]$", "")) // 앞뒤 대괄호 제거
                                                .build());
                }
            }
            return satelliteImages;

        } catch(Exception e) {
            e.printStackTrace();
            throw new LookupException(JSON_PARSING_FAILED);
        }
    }


}
