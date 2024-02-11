package com.example.demo.weather.service;

import com.example.demo.common.geoLocation.GeoLocationClient;
import com.example.demo.weather.dto.GeoLocationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeoLocationService {

    private final GeoLocationClient geoLocationClient;


    public GeoLocationDto getGeoLocation(String ip) {
        return geoLocationClient.getGeoLocation(ip);
    }

}
