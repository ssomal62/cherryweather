package com.example.demo.weather.service;

import com.example.demo.weather.dto.LocationReqDto;
import com.example.demo.weather.dto.LocationResDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final RestTemplate restTemplate;

    public LocationResDto convertLocation(HttpServletRequest request) {
        LocationReqDto reqDto = getLocationByIp(request);

        if(reqDto != null && "success".equals(reqDto.getStatus())) {
            // GeoConverter를 사용하여 위도와 경도를 반환하고, IP 주소를 전달
            return GeoConverter.toXY(reqDto.getLat(), reqDto.getLon(), reqDto.getQuery());
        } else {
            return null; // 위치 정보 없음 **적절한 예외처리 작업 필요
        }
    }

    public LocationReqDto getLocationByIp(HttpServletRequest request) {
        String userIp = extractClientIp(request);
        // String url = "http://ip-api.com/json/" + userIp; //url 뒤에 userIp를 입력하지 않아도 원하는 값을 불러올 수 있음
        String url = "http://ip-api.com/json/";
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode rootNode = mapper.readTree(response);
            LocationReqDto locationReqDto = LocationReqDto.builder()
                                                    .status(rootNode.get("status").asText())
                                                    .country(rootNode.get("country").asText())
                                                    .countryCode(rootNode.get("countryCode").asText())
                                                    .region(rootNode.get("region").asText())
                                                    .regionName(rootNode.get("regionName").asText())
                                                    .city(rootNode.get("city").asText())
                                                    .zip(rootNode.get("zip").asText())
                                                    .lat(rootNode.get("lat").asDouble())
                                                    .lon(rootNode.get("lon").asDouble())
                                                    .timezone(rootNode.get("timezone").asText())
                                                    .isp(rootNode.get("isp").asText())
                                                    .org(rootNode.get("org").asText())
                                                    .as(rootNode.get("as").asText())
                                                    .query(rootNode.get("query").asText())
                                                    .build();
            return locationReqDto;
        } catch(IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // X-FORWARDED-FOR 헤더를 사용하여 정확한 사용자 IP를 얻기 위한 메소드
    public String extractClientIp(HttpServletRequest request) {
        String remoteAddr = "";

        if(request != null) {
            remoteAddr = request.getHeader("X-FORWARDED-FOR");
            if(remoteAddr == null || "".equals(remoteAddr)) {
                remoteAddr = request.getRemoteAddr();
            } else {
                // X-FORWARDED-FOR는 쉼표로 구분된 리스트일 수 있음
                remoteAddr = remoteAddr.split(",")[0].trim();
            }
        }
        return remoteAddr;
    }

}
