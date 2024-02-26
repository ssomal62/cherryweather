package com.example.demo.weather.controller;

import com.example.demo.weather.dto.DaylightDto;
import com.example.demo.weather.service.DaylightService;
import com.example.demo.weather.service.GeoLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/weather")
public class DaylightController {

    private final DaylightService daylightService;
    private final GeoLocationService geoLocationService;

    @GetMapping("/daylight")
    public ResponseEntity<DaylightDto> getDaylight(@RequestParam("ip") String clientIp) {
        return ResponseEntity.ok().body(daylightService.getDaylightInfo(geoLocationService.getGeoLocation(clientIp)));
    }

}
