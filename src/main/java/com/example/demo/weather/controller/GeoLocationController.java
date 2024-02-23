package com.example.demo.weather.controller;

import com.example.demo.weather.dto.GeoLocationReqDto;
import com.example.demo.weather.dto.GeoLocationResDto;
import com.example.demo.weather.service.GeoLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/geolocation")
public class GeoLocationController {

    private final GeoLocationService geoLocationService;

    @PostMapping("/reqlocation")
    public ResponseEntity<GeoLocationReqDto> getGeoLocation(@RequestBody Map<String,String > ipData) {
        String clientIp = ipData.get("ip");
        GeoLocationReqDto location = geoLocationService.getGeoLocation(clientIp);
        if(location != null) {
            return ResponseEntity.ok(location);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/reslocation")
    public ResponseEntity<GeoLocationResDto> getGeoLocation2(@RequestBody Map<String,String > ipData) {
        String clientIp = ipData.get("ip");
        GeoLocationResDto location = geoLocationService.convertLocation(clientIp);
        if(location != null) {
            return ResponseEntity.ok(location);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}