package com.example.demo.weather.controller;

import com.example.demo.weather.dto.AirQualityDto;
import com.example.demo.weather.dto.MonitoringStationDto;
import com.example.demo.weather.dto.TmLocationDto;
import com.example.demo.weather.service.AirInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/air")
public class AirInfoController {

    private final AirInfoService airInfoService;

    @GetMapping("/tmlocation")
    public TmLocationDto getTmLocation(@RequestParam("ip") String clientIp) {
        return airInfoService.getTmLocation(clientIp);
    }

    @GetMapping("/station")
    public MonitoringStationDto getStation(@RequestParam("ip") String clientIp) {
        return airInfoService.getStation(clientIp);
    }

    @GetMapping("/airquality")
    public AirQualityDto getAirQuality(@RequestParam("ip") String clientIp) {
        return airInfoService.getAirQuality(clientIp);
    }
}
