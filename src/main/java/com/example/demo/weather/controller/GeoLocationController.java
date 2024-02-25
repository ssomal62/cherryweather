package com.example.demo.weather.controller;

import com.example.demo.weather.dto.GeoLocationReqDto;
import com.example.demo.weather.dto.GeoLocationResDto;
import com.example.demo.weather.service.GeoLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/geolocation")
public class GeoLocationController {

    private final GeoLocationService geoLocationService;

    @GetMapping("/reqlocation")
    public ResponseEntity<GeoLocationReqDto> getGeoLocation(@RequestParam("ip") String clientIp) {
        GeoLocationReqDto location = geoLocationService.getGeoLocation(clientIp);
        if(location != null) {
            return ResponseEntity.ok(location);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/reslocation")
    public ResponseEntity<GeoLocationResDto> getGeoLocation2(@RequestParam("ip") String clientIp) {
        GeoLocationResDto location = geoLocationService.convertLocation(clientIp);
        if(location != null) {
            return ResponseEntity.ok(location);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}