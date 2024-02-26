package com.example.demo.weather.service;

import com.example.demo.common.geoLocation.GeoLocationClient;
import com.example.demo.weather.dto.GeoLocationReqDto;
import com.example.demo.weather.dto.GeoLocationResDto;
import com.example.demo.weather.exception.LookupException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.example.demo.weather.exception.enums.WeatherExeptionStatus.LOCATION_INFO_LOOKUP_FAILED;

@Service
@RequiredArgsConstructor
public class GeoLocationService {

    private final GeoLocationClient geoLocationClient;
    private final ObjectMapper objectMapper;
    private final GeoConverter geoConverter;

    public GeoLocationResDto convertLocation(String clientIp) {
        GeoLocationReqDto reqDto = getGeoLocation(clientIp);
        return geoConverter.toXY(reqDto);
    }

    public GeoLocationReqDto getGeoLocation(String clientIp) {
        try {
            String response = geoLocationClient.run(clientIp);
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
                           .ip(clientIp)
                           .build();
        } catch(Exception e) {
            throw new LookupException(LOCATION_INFO_LOOKUP_FAILED);
        }
    }
}