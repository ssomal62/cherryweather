package com.example.demo.weather.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class WeatherServiceClient {

    // @Value("${weather.api.serviceKey}")
    private final String serviceKey = "mDNPPMp0rOT/VxVXKEJeQUDK1s169twmiSBFn4c/8pMRT/yFNC12SdZrV0hhVwDq7vn8b3D1fLOa3cmfWGv5hQ==";
    private final String dataType = "JSON";

    private final RestTemplate restTemplate;

    public ResponseEntity<String> getShortWeatherForecast(String functionName, String baseDate, String baseTime, int nx, int ny) {
        String shortUrl = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";
        return callWeatherApi(shortUrl, functionName, baseDate, baseTime, nx, ny);
    }

    public ResponseEntity<String> callWeatherApi(String url, String functionName, String baseDate, String baseTime, int nx, int ny) {
        String fullUrl = String.format("%s/%s?serviceKey=%s&pageNo=1&numOfRows=1000&dataType=%s&base_date=%s&base_time=%s&nx=%d&ny=%d", url, functionName, serviceKey, dataType, baseDate, baseTime, nx, ny);
        System.out.println("fullUrl : " + fullUrl);
        return restTemplate.getForEntity(fullUrl, String.class);
    }

}
