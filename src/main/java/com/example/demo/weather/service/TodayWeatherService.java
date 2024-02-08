package com.example.demo.weather.service;

import com.example.demo.weather.dto.TodayWeatherReqDto;
import com.example.demo.weather.dto.TodayWeatherResDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class TodayWeatherService {
    private final String serviceKey = "mDNPPMp0rOT/VxVXKEJeQUDK1s169twmiSBFn4c/8pMRT/yFNC12SdZrV0hhVwDq7vn8b3D1fLOa3cmfWGv5hQ==";
    private final String dataType = "JSON";
    private final String baseDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    private final String baseTime = "0600";
    private final String nx = "60";
    private final String ny = "127";
    private final String url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=" + serviceKey + "&pageNo=1&numOfRows=1000&dataType=" + dataType + "&base_date=" + baseDate + "&base_time=" + baseTime + "&nx=" + nx + "&ny=" + ny;

    public List<TodayWeatherReqDto> getTodayWeather() {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        return parseJsonResponse(response);
    }

    private List<TodayWeatherReqDto> parseJsonResponse(String response) {
        List<TodayWeatherReqDto> todayWeatherList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(url);
        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode itemsNode = root.path("response").path("body").path("items").path("item");
            for(JsonNode itemNome : itemsNode) {
                TodayWeatherReqDto dto = TodayWeatherReqDto.builder()
                                              .baseDate(itemNome.path("baseDate").asText())
                                              .baseTime(itemNome.path("baseTime").asText())
                                              .category(itemNome.path("category").asText())
                                              .nx(itemNome.path("nx").asInt())
                                              .ny(itemNome.path("ny").asInt())
                                              .obsrValue(itemNome.path("obsrValue").asText())
                                              .build();
                todayWeatherList.add(dto);
            }
        } catch(IOException e) {
            e.printStackTrace();
        }
        return todayWeatherList;
    }

    public List<TodayWeatherResDto> formatWeatherData(List<TodayWeatherReqDto> weatherDataList) {
        TodayWeatherResDto.TodayWeatherResDtoBuilder builder = TodayWeatherResDto.builder()
                                                                                   .baseDate(baseDate)
                                                                                   .baseTime(baseTime)
                                                                                   .nx(Integer.parseInt(nx))
                                                                                   .ny(Integer.parseInt(ny));

        for(TodayWeatherReqDto dto : weatherDataList) {
            switch(dto.getCategory()) {
                case "PTY":
                    builder.PTY(dto.getObsrValue());
                    break;
                case "REH":
                    builder.REH(dto.getObsrValue());
                    break;
                case "RN1":
                    builder.RN1(dto.getObsrValue());
                    break;
                case "T1H":
                    builder.T1H(dto.getObsrValue());
                    break;
                case "UUU":
                    builder.UUU(dto.getObsrValue());
                    break;
                case "VEC":
                    builder.VEC(dto.getObsrValue());
                    break;
                case "VVV":
                    builder.VVV(dto.getObsrValue());
                    break;
                case "WSD":
                    builder.WSD(dto.getObsrValue());
                    break;
            }
        }
        List<TodayWeatherResDto> formattedWeatherDataList = new ArrayList<>();
        formattedWeatherDataList.add(builder.build());

        return formattedWeatherDataList;
    }
}
