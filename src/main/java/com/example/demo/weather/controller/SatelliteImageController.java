package com.example.demo.weather.controller;

import com.example.demo.weather.dto.SatelliteImageDto;
import com.example.demo.weather.service.SatelliteImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/weather")
public class SatelliteImageController {

    private final SatelliteImageService satelliteImageService;

    @GetMapping("/satImg")
    public List<SatelliteImageDto> getSatelliteImage() {
        return satelliteImageService.getSatelliteImage();
    }
}
