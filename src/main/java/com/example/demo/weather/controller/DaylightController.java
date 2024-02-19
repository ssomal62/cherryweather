package com.example.demo.weather.controller;

import com.example.demo.weather.dto.DaylightDto;
import com.example.demo.weather.service.DaylightService;
import com.example.demo.weather.service.GeoLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/a/")
public class DaylightController {

    private final DaylightService daylightService;
    private final GeoLocationService geoLocationService;

    @GetMapping("/daylight")
    public DaylightDto getDaylight() {
        return daylightService.getDaylightInfo(geoLocationService.getGeoLocation());
    }

}
