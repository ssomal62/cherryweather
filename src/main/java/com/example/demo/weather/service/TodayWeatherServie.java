package com.example.demo.weather.service;

import com.example.demo.weather.dto.GeoLocationResDto;
import com.example.demo.weather.dto.TodayWeatherReqDto;
import com.example.demo.weather.dto.TodayWeatherResDto;
import com.example.demo.weather.exception.LookupException;
import com.example.demo.weather.exception.enums.WeatherExeptionStatus;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.demo.weather.exception.enums.WeatherExeptionStatus.*;

@Service
@RequiredArgsConstructor
public class TodayWeatherServie {

    private final GeoLocationService geoLocationService;
    private final WeatherServiceClient weatherServiceClient;

    private final String baseDate = LocalDate.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    private final String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

    public List<TodayWeatherReqDto> getTodayWeather() {

        String functionName = "getVilageFcst";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseJson = null;
        String resultCode;

        GeoLocationResDto geoLocationResDto = geoLocationService.convertLocation();
        int nx = (int) geoLocationResDto.getNx();
        int ny = (int) geoLocationResDto.getNy();

        ResponseEntity<String> response = weatherServiceClient.getTodayWeatherForecast(functionName, baseDate, nx, ny);
        try {
            responseJson = objectMapper.readTree(response.getBody());
            resultCode = responseJson.path("response").path("header").path("resultCode").asText();
        } catch(JsonProcessingException e) {
            throw new LookupException(WeatherExeptionStatus.JSON_PARSING_FAILED);
        }

        // resultCode에 따른 예외 처리
        switch(resultCode) {
            case "00": // 정상 처리
                return parseJsonResponse(response.getBody());
            case "01":
                throw new LookupException(WEATHER_API_APPLICATION_ERROR);
            case "02":
                throw new LookupException(WEATHER_API_DB_ERROR);
            case "03":
                throw new LookupException(WEATHER_API_NODATA_ERROR);
            case "04":
                throw new LookupException(WEATHER_API_HTTP_ERROR);
            case "05":
                throw new LookupException(WEATHER_API_SERVICE_TIME_OUT);
            case "10":
                throw new LookupException(WEATHER_API_INVALID_REQUEST_PARAMETER_ERROR);
            case "11":
                throw new LookupException(WEATHER_API_NO_MANDATORY_REQUEST_PARAMETERS_ERROR);
            case "12":
                throw new LookupException(WEATHER_API_NO_OPENAPI_SERVICE_ERROR);
            case "20":
                throw new LookupException(WEATHER_API_SERVICE_ACCESS_DENIED_ERROR);
            case "21":
                throw new LookupException(WEATHER_API_TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR);
            case "22":
                throw new LookupException(WEATHER_API_LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR);
            case "30":
                throw new LookupException(WEATHER_API_SERVICE_KEY_IS_NOT_REGISTERED_ERROR);
            case "31":
                throw new LookupException(WEATHER_API_DEADLINE_HAS_EXPIRED_ERROR);
            case "32":
                throw new LookupException(WEATHER_API_UNREGISTERED_IP_ERROR);
            case "33":
                throw new LookupException(WEATHER_API_UNSIGNED_CALL_ERROR);
            default:
                throw new LookupException(WEATHER_API_UNKNOWN_ERROR);
        }
    }

    public List<TodayWeatherResDto> getFormattedTodayWeather() {
        GeoLocationResDto geoLocationResDto = geoLocationService.convertLocation();
        int nx = (int) geoLocationResDto.getNx();
        int ny = (int) geoLocationResDto.getNy();
        String r1 = geoLocationResDto.getR1();
        String r2 = geoLocationResDto.getR2();
        String r3 = geoLocationResDto.getR3();

        List<TodayWeatherReqDto> weatherDataList = getTodayWeather();

        return formatWeatherData(weatherDataList, nx, ny, r1, r2, r3);
    }


    private List<TodayWeatherReqDto> parseJsonResponse(String response) {
        List<TodayWeatherReqDto> todayWeatherList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();

        try {

            JsonNode root = objectMapper.readTree(response);
            JsonNode itemsNode = root.path("response").path("body").path("items").path("item");
            for(JsonNode item : itemsNode) {
                String fcstDate = item.path("fcstDate").asText();
                if(fcstDate.equals(currentDate)) {
                    TodayWeatherReqDto dto = TodayWeatherReqDto.builder()
                                                     .baseDate(item.path("baseDate").asText())
                                                     .baseTime(item.path("baseTime").asText())
                                                     .category(item.path("category").asText())
                                                     .fcstDate(fcstDate)
                                                     .fcstTime(item.path("fcstTime").asText())
                                                     .fcstValue(item.path("fcstValue").asText())
                                                     .nx(item.path("nx").asInt())
                                                     .ny(item.path("ny").asInt())
                                                     .build();
                    todayWeatherList.add(dto);
                }
            }
        } catch(JsonProcessingException e) {
            throw new LookupException(JSON_PARSING_FAILED);
        }
        return todayWeatherList;
    }

    public List<TodayWeatherResDto> formatWeatherData(List<TodayWeatherReqDto> weatherDataList, int nx, int ny, String r1, String r2, String r3) {
        Map<String, TodayWeatherResDto.TodayWeatherResDtoBuilder> builders = new HashMap<>();

        for(TodayWeatherReqDto data : weatherDataList) {
            String dateTime = data.getFcstDate() + data.getFcstTime();
            builders.computeIfAbsent(dateTime, k -> TodayWeatherResDto.builder()
                                                            .fcstDate(data.getFcstDate())
                                                            .fcstTime(data.getFcstTime())
                                                            .nx(nx)
                                                            .ny(ny)
                                                            .r1(r1)
                                                            .r2(r2)
                                                            .r3(r3));

            TodayWeatherResDto.TodayWeatherResDtoBuilder builder = builders.get(dateTime);
            switch(data.getCategory()) {
                case "POP":
                    builder.POP(data.getFcstValue());
                    break;
                case "PTY":
                    builder.PTY(data.getFcstValue());
                    break;
                case "PCP":
                    builder.PCP(data.getFcstValue());
                    break;
                case "REH":
                    builder.REH(data.getFcstValue());
                    break;
                case "SNO":
                    builder.SNO(data.getFcstValue());
                    break;
                case "SKY":
                    builder.SKY(data.getFcstValue());
                    break;
                case "TMP":
                    builder.TMP(data.getFcstValue());
                    break;
                case "TMN":
                    builder.TMN(data.getFcstValue());
                    break;
                case "TMX":
                    builder.TMX(data.getFcstValue());
                    break;
                case "UUU":
                    builder.UUU(data.getFcstValue());
                    break;
                case "VVV":
                    builder.VVV(data.getFcstValue());
                    break;
                case "WAV":
                    builder.WAV(data.getFcstValue());
                    break;
                case "VEC":
                    builder.VEC(data.getFcstValue());
                    break;
                case "WSD":
                    builder.WSD(data.getFcstValue());
                    break;
            }
        }
        return builders.entrySet().stream()
                       .map(e -> e.getValue().build())
                       .collect(Collectors.toList());
    }
}