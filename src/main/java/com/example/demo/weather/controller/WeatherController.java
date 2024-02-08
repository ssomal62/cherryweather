package com.example.demo.weather.controller;

import com.example.demo.weather.dto.TodayWeatherReqDto;
import com.example.demo.weather.dto.TodayWeatherResDto;
import com.example.demo.weather.service.TodayWeatherService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    // private final LocationService locationService;

    @GetMapping("/today")
    public List<TodayWeatherReqDto> getTodayWeather() {
        return todayWeatherService.getTodayWeather();
    }

    @GetMapping("/ftoday")
    public List<TodayWeatherResDto> getFormattedTodayWeather() {
        // 오늘 날씨 데이터 가져오기
        List<TodayWeatherResDto> formattedWeatherData = todayWeatherService.formatWeatherData(todayWeatherService.getTodayWeather());
        return formattedWeatherData;
    }

    // @GetMapping("/location")
    // public ResponseEntity<LocationReqDto> getUserLocation(HttpServletRequest request) {
    //     LocationReqDto locationReqDto = locationService.getLocationByIp(request);
    //     if(locationReqDto != null) {
    //         return ResponseEntity.ok(locationReqDto);
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }
    //
    // @GetMapping("/convertLoc")
    // public ResponseEntity<LocationResDto> convertLocation(HttpServletRequest request) {
    //     LocationResDto locationResDto = locationService.convertLocation(request);
    //     if(locationResDto != null) {
    //         return ResponseEntity.ok(locationResDto);
    //     } else {
    //         return ResponseEntity.notFound().build(); // 오류 발생 시 404 응답 반환
    //     }
    //
    // }
}