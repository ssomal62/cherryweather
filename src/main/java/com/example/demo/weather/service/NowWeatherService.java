package com.example.demo.weather.service;

import com.example.demo.weather.dto.GeoLocationResDto;
import com.example.demo.weather.dto.NowWeatherReqDto;
import com.example.demo.weather.dto.NowWeatherResDto;
import com.example.demo.weather.exception.LookupException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static com.example.demo.weather.exception.enums.WeatherExeptionStatus.*;

@Service
@RequiredArgsConstructor
public class NowWeatherService {

    private final GeoLocationService geoLocationService;

    private final String baseDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    private final String baseTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH00"));

    public List<NowWeatherReqDto> getNowWeather() {

        String serviceKey = "mDNPPMp0rOT/VxVXKEJeQUDK1s169twmiSBFn4c/8pMRT/yFNC12SdZrV0hhVwDq7vn8b3D1fLOa3cmfWGv5hQ==";
        String dataType = "JSON";

        GeoLocationResDto geoLocationResDto = geoLocationService.convertLocation();
        int nx = (int) geoLocationResDto.getNx();
        int ny = (int) geoLocationResDto.getNy();

        String url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=" + serviceKey + "&pageNo=1&numOfRows=1000&dataType=" + dataType + "&base_date=" + baseDate + "&base_time=" + baseTime + "&nx=" + nx + "&ny=" + ny;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        System.out.println(url);

        // 예외처리
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseJson = null;
        try {
            responseJson = objectMapper.readTree(response.getBody());
        } catch(JsonProcessingException e) {
            throw new LookupException(JSON_PARSING_FAILED);
        }
        String resultCode = responseJson.path("response").path("header").path("resultCode").asText();
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

    public List<NowWeatherResDto> getFormattedNowWeather() {
        // 위치 정보
        GeoLocationResDto geoLocationResDto = geoLocationService.convertLocation();
        int nx = (int) geoLocationResDto.getNx();
        int ny = (int) geoLocationResDto.getNy();
        // 날씨 정보
        List<NowWeatherReqDto> weatherDataList = getNowWeather();

        // 날씨 데이터를 포맷
        return formatWeatherData(weatherDataList, nx, ny);
    }

    private List<NowWeatherReqDto> parseJsonResponse(String response) {
        List<NowWeatherReqDto> nowWeatherList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode itemsNode = root.path("response").path("body").path("items").path("item");
            for(JsonNode itemNome : itemsNode) {
                NowWeatherReqDto dto = NowWeatherReqDto.builder()
                                               .baseDate(itemNome.path("baseDate").asText())
                                               .baseTime(itemNome.path("baseTime").asText())
                                               .category(itemNome.path("category").asText())
                                               .nx(itemNome.path("nx").asInt())
                                               .ny(itemNome.path("ny").asInt())
                                               .obsrValue(itemNome.path("obsrValue").asText())
                                               .build();
                nowWeatherList.add(dto);
            }
        } catch(IOException e) {
            e.printStackTrace();
        }
        return nowWeatherList;
    }

    public List<NowWeatherResDto> formatWeatherData(List<NowWeatherReqDto> weatherDataList, double nx, double ny) {
        NowWeatherResDto.NowWeatherResDtoBuilder builder = NowWeatherResDto.builder()
                                                                   .baseDate(baseDate)
                                                                   .baseTime(baseTime)
                                                                   .nx((int) nx)
                                                                   .ny((int) ny);

        for(NowWeatherReqDto dto : weatherDataList) {
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
        List<NowWeatherResDto> formattedWeatherDataList = new ArrayList<>();
        formattedWeatherDataList.add(builder.build());

        return formattedWeatherDataList;
    }
}
