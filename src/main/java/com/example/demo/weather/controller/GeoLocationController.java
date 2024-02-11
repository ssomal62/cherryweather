package com.example.demo.weather.controller;

import com.example.demo.weather.dto.GeoLocationDto;
import com.example.demo.weather.service.GeoLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/geolocation")
public class GeoLocationController {
    private final GeoLocationService geoLocationService;

    @GetMapping("/location")
    public ResponseEntity<GeoLocationDto> getGeoLocation(@RequestParam String ip) {
        try {
            GeoLocationDto location = geoLocationService.getGeoLocation(ip);
            if (location != null) {
                return ResponseEntity.ok(location);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
