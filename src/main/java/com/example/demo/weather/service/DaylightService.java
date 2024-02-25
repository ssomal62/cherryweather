package com.example.demo.weather.service;

import com.example.demo.weather.dto.DaylightDto;
import com.example.demo.weather.dto.GeoLocationReqDto;
import com.example.demo.weather.exception.LookupException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import static com.example.demo.weather.exception.enums.WeatherExeptionStatus.JSON_PARSING_FAILED;

@Service
@RequiredArgsConstructor
public class DaylightService {

    private final RestTemplate restTemplate;

    private final ZoneId korTimeZone = ZoneId.of("Asia/Seoul");
    private final String baseUrl = "https://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getLCRiseSetInfo";

    private final String baseDate = LocalDate.now(korTimeZone).format(DateTimeFormatter.ofPattern("yyyyMMdd"));

    @Value("${weather.kma.serviceKey}")
    private String serviceKey;


    public DaylightDto getDaylightInfo(GeoLocationReqDto geoLocationReqDto) {
        String url = String.format("%s?serviceKey=%s&locdate=%s&longitude=%s&latitude=%s&dnYn=Y", baseUrl, serviceKey, baseDate, geoLocationReqDto.getLon(), geoLocationReqDto.getLat());
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return parseJsonToDto(response.getBody());
    }

    public DaylightDto parseJsonToDto(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode item = root.path("response").path("body").path("items").path("item");

            return DaylightDto.builder()
                           .locdate(item.path("locdate").asText())
                           .sunrise(item.path("sunrise").asText().trim())
                           .sunset(item.path("sunset").asText().trim())
                           .moonrise(item.path("moonrise").asText().trim())
                           .moonset(item.path("moonset").asText().trim())
                           .build();
        } catch(Exception e) {
            e.printStackTrace();
            throw new LookupException(JSON_PARSING_FAILED);
        }
    }
}