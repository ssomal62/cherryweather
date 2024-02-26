package com.example.demo.weather.controller;

import com.example.demo.weather.dto.*;
import com.example.demo.weather.service.NowWeatherService;
import com.example.demo.weather.service.TodayWeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/weather")
public class WeatherController {

    private final NowWeatherService nowWeatherService;
    private final TodayWeatherService todayWeatherService;


    @PostMapping("/now/info")
    public List<NowWeatherReqDto> getNowWeather(@RequestBody Map<String, String> ipData) {
        String clientIp = ipData.get("ip");
        return nowWeatherService.getNowWeather(clientIp);
    }

    @PostMapping("/now")
    public List<NowWeatherResDto> getFormattedNowWeather(@RequestBody Map<String, String> ipData) {
        String clientIp = ipData.get("ip");
        return nowWeatherService.getFormattedNowWeather(clientIp);
    }

    @PostMapping("/today/info")
    public List<TodayWeatherReqDto> getTodayWeather(@RequestBody Map<String, String> ipData) {
        String clientIp = ipData.get("ip");
        return todayWeatherService.getTodayWeather(clientIp);
    }

    @PostMapping("/today")
    public List<TodayWeatherResDto> getFormattedTodayWeather(@RequestBody Map<String, String> ipData) {
        String clientIp = ipData.get("ip");
        return todayWeatherService.getFormattedTodayWeather(clientIp);
    }

    @PostMapping("/daily")
    public DailyWeatherDto getDailyWeather(@RequestBody Map<String, String> ipData) {
        String clientIp = ipData.get("ip");
        return todayWeatherService.getDailyWeather(todayWeatherService.getFormattedTodayWeather(clientIp), clientIp);
    }

    @PostMapping("/hourly")
    public List<HourlyWeatherDto> getHourlyWeather(@RequestBody Map<String, String> ipData) {
        String clientIp = ipData.get("ip");
        return todayWeatherService.getHourlyWeather(clientIp);
    }
}