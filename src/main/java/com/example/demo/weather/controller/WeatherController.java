package com.example.demo.weather.controller;

import com.example.demo.weather.dto.*;
import com.example.demo.weather.service.NowWeatherService;
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

    private final NowWeatherService nowWeatherService;
    private final TodayWeatherService todayWeatherService;


    @GetMapping("/now/info")
    public List<NowWeatherReqDto> getNowWeather() {
        return nowWeatherService.getNowWeather();
    }

    @GetMapping("/now")
    public List<NowWeatherResDto> getFormattedNowWeather() {
        return nowWeatherService.getFormattedNowWeather();
    }

    @GetMapping("/today/info")
    public List<TodayWeatherReqDto> getTodayWeather() {
        return todayWeatherService.getTodayWeather();
    }

    @GetMapping("/today")
    public List<TodayWeatherResDto> getFormattedTodayWeather() {
        return todayWeatherService.getFormattedTodayWeather();
    }

    @GetMapping("/daily")
    public DailyWeatherDto getDailyWeather() {
        return todayWeatherService.getDailyWeather(todayWeatherService.getFormattedTodayWeather());
    }

    @GetMapping("/hourly")
    public List<HourlyWeatherDto> getHourlyWeather() {
        return todayWeatherService.getHourlyWeather();
    }
}