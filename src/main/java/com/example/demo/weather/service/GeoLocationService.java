package com.example.demo.weather.service;

import com.example.demo.common.geoLocation.GeoLocationClient;
import com.example.demo.weather.dto.GeoLocationDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeoLocationService {

    private final GeoLocationClient geoLocationClient;
    private final ObjectMapper objectMapper;

    public GeoLocationDto getGeoLocation(String ip) {
        try {
            String response = geoLocationClient.run(ip);
            JsonNode root = objectMapper.readTree(response);
            JsonNode locationNode = root.path("geoLocation");

            return GeoLocationDto.builder()
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
            String errorMessage = "Failed to retrieve geo location data: " + e.getMessage();
            throw new RuntimeException(errorMessage);
        }
    }
}