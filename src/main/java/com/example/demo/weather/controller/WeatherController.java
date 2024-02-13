package com.example.demo.weather.controller;

import com.example.demo.weather.dto.GeoLocationResDto;
import com.example.demo.weather.dto.TodayWeatherReqDto;
import com.example.demo.weather.dto.TodayWeatherResDto;
import com.example.demo.weather.service.GeoLocationService;
import com.example.demo.weather.service.TodayWeatherService;
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
public class WeatherController {

    private final TodayWeatherService todayWeatherService;

    private final GeoLocationService geoLocationService;

    @GetMapping("/today")
    public List<TodayWeatherReqDto> getTodayWeather() {
        return todayWeatherService.getTodayWeather();
    }

    @GetMapping("/ftoday")
    public List<TodayWeatherResDto> getFormattedTodayWeather() {
        // 위치 정보
        GeoLocationResDto geoLocationResDto = geoLocationService.convertLocation();
        // 날씨 데이터
        List<TodayWeatherReqDto> weatherDataList = todayWeatherService.getTodayWeather();
        // 위치 정보와 데이터를 포맷 후 반환
        List<TodayWeatherResDto> todayWeatherResDtos = todayWeatherService.formatWeatherData(weatherDataList, geoLocationResDto.getNx(), geoLocationResDto.getNy());
        return todayWeatherResDtos;
    }
}