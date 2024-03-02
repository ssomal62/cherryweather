package com.example.demo.weather.controller;

import com.example.demo.weather.dto.*;
import com.example.demo.weather.service.NowWeatherService;
import com.example.demo.weather.service.TodayWeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/weather")
public class WeatherController {

    private final NowWeatherService nowWeatherService;
    private final TodayWeatherService todayWeatherService;


    @GetMapping("/now/info")
    public List<NowWeatherReqDto> getNowWeather(@RequestParam("ip") String clientIp) {
        System.out.println("Weather Controller getNowWeather IP : " + clientIp);
        return nowWeatherService.getNowWeather(clientIp);
    }

    @GetMapping("/now")
    public List<NowWeatherResDto> getFormattedNowWeather(@RequestParam("ip") String clientIp) {
        return nowWeatherService.getFormattedNowWeather(clientIp);
    }

    @GetMapping("/today/info")
    public List<TodayWeatherReqDto> getTodayWeather(@RequestParam("ip") String clientIp) {
        return todayWeatherService.getTodayWeather(clientIp);
    }

    @GetMapping("/today")
    public List<TodayWeatherResDto> getFormattedTodayWeather(@RequestParam("ip") String clientIp) {
        return todayWeatherService.getFormattedTodayWeather(clientIp);
    }

    @GetMapping("/daily")
    public DailyWeatherDto getDailyWeather(@RequestParam("ip") String clientIp) {
        return todayWeatherService.getDailyWeather(todayWeatherService.getFormattedTodayWeather(clientIp), clientIp);
    }

    @GetMapping("/hourly")
    public List<HourlyWeatherDto> getHourlyWeather(@RequestParam("ip") String clientIp) {
        return todayWeatherService.getHourlyWeather(clientIp);
    }

    @GetMapping("/firsthalf")
    public List<WeeklyWeatherDto> getFirstHalfWeather(@RequestParam("ip") String clientIp) {
        return todayWeatherService.getFirstHalfWeeklyWeather(clientIp);
    }

    @GetMapping("/secondhalf")
    public List<WeeklyWeatherDto> getSecondHalfWeather(@RequestParam("ip") String clientIp) {
        return todayWeatherService.getSecondHalfWeeklyWeather(clientIp);
    }

    @GetMapping("/weekly")
    public List<WeeklyWeatherDto> getWeeklyWeather(@RequestParam("ip") String clientIp) {
        return todayWeatherService.getWeeklyWeather(clientIp);
    }
}