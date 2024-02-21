package com.example.demo.weather.controller;

import com.example.demo.weather.dto.*;
import com.example.demo.weather.service.NowWeatherService;
import com.example.demo.weather.service.TodayWeatherServie;
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
    private final TodayWeatherServie todayWeatherServie;


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
        return todayWeatherServie.getTodayWeather();
    }

    @GetMapping("/today")
    public List<TodayWeatherResDto> getFormattedTodayWeather() {
        return todayWeatherServie.getFormattedTodayWeather();
    }

    @GetMapping("/daily")
    public DailyWeatherDto getDailyWeather() {
        return todayWeatherServie.getDailyWeather(todayWeatherServie.getFormattedTodayWeather());
    }

    @GetMapping("/hourly")
    public List<HourlyWeatherDto> getHourlyWeather() {
        return todayWeatherServie.getHourlyWeather();
    }
}