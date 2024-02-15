package com.example.demo.weather.service;

import com.example.demo.common.geoLocation.GeoLocationClient;
import com.example.demo.weather.dto.GeoLocationReqDto;
import com.example.demo.weather.dto.GeoLocationResDto;
import com.example.demo.weather.exception.LookupException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static com.example.demo.weather.exception.enums.WeatherExeptionStatus.*;

@Service
@RequiredArgsConstructor
public class GeoLocationService {

    private final GeoLocationClient geoLocationClient;
    private final ObjectMapper objectMapper;
    private final GeoConverter geoConverter;

    public GeoLocationResDto convertLocation() {
        GeoLocationReqDto reqDto = getGeoLocation();
        return geoConverter.toXY(reqDto);
    }

    public GeoLocationReqDto getGeoLocation() {
        String ip = getClientPubliIP();
        System.out.println("ip : " + ip);
        try {
            String response = geoLocationClient.run(ip);
            JsonNode root = objectMapper.readTree(response);
            JsonNode locationNode = root.path("geoLocation");

            return GeoLocationReqDto.builder()
                           .country(locationNode.path("country").asText())
                           .code(locationNode.path("code").asText())
                           .r1(locationNode.path("r1").asText())
                           .r2(locationNode.path("r2").asText())
                           .r3(locationNode.path("r3").asText())
                           .lat(locationNode.path("lat").asDouble())
                           .lon(locationNode.path("long").asDouble())
                           .net(locationNode.path("net").asText())
                           .build();
        } catch(Exception e) {

            throw new LookupException(LOCATION_INFO_LOOKUP_FAILED);
        }
    }

    // ip-api.com에서 공인 ip를 획득하고 반환합니다.
    public String getClientPubliIP() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://ip-api.com/json/";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        if(response.getStatusCode() == HttpStatus.OK) {
            String responseBody = response.getBody();
            // responseBody를 파싱하여 "query"의 값(IP 주소)를 추출합니다.
            // Jackson ObjectMapper 또는 Gson을 사용하여 JSON을 파싱할 수 있습니다.
            JsonNode jsonNode;
            try {
                jsonNode = objectMapper.readTree(responseBody);
            } catch(JsonProcessingException e) {
                throw new LookupException(JSON_PARSING_FAILED);
            }
            return jsonNode.get("query").asText();
        } else {
            throw new LookupException(IP_LOOKUP_FAILED);
        }
    }

}