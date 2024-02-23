package com.example.demo.weather.controller;

import com.example.demo.weather.dto.DaylightDto;
import com.example.demo.weather.service.DaylightService;
import com.example.demo.weather.service.GeoLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/weather")
public class DaylightController {

    private final DaylightService daylightService;
    private final GeoLocationService geoLocationService;

    @PostMapping("/daylight")
    public DaylightDto getDaylight(@RequestBody Map<String, String> ipData) {
        String clientIp = ipData.get("ip");
        return daylightService.getDaylightInfo(geoLocationService.getGeoLocation(clientIp));
    }

}
