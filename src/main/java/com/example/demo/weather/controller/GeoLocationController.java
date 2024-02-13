package com.example.demo.weather.controller;

import com.example.demo.weather.dto.GeoLocationReqDto;
import com.example.demo.weather.dto.GeoLocationResDto;
import com.example.demo.weather.service.GeoLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/geolocation")
public class GeoLocationController {

    private final GeoLocationService geoLocationService;

    @GetMapping("/reqlocation")
    public ResponseEntity<GeoLocationReqDto> getGeoLocation(@RequestParam String ip) {
        GeoLocationReqDto location = geoLocationService.getGeoLocation(ip);
        if(location != null) {
            return ResponseEntity.ok(location);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/reslocation")
    public ResponseEntity<GeoLocationResDto> getGeoLocation2(@RequestParam String ip) {
        GeoLocationResDto location = geoLocationService.convertLocation(ip);
        if(location != null) {
            return ResponseEntity.ok(location);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}