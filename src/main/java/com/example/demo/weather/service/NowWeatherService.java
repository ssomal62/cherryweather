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
    private final WeatherServiceClient weatherServiceClient;

    private final String baseDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    private final String baseTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH00"));

    public List<NowWeatherReqDto> getNowWeather() {

        String functionName = "getUltraSrtNcst";

        GeoLocationResDto geoLocationResDto = geoLocationService.convertLocation();
        int nx = (int) geoLocationResDto.getNx();
        int ny = (int) geoLocationResDto.getNy();

        String tempBaseTime = baseTime;
        ResponseEntity<String> response = null;
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseJson = null;
        String resultCode = "";

        // 예외처리
        for(int i = 0; i < 2; i++) {
            response = weatherServiceClient.getNowWeatherForecast(functionName, baseDate, tempBaseTime, nx, ny);
            try {
                responseJson = objectMapper.readTree(response.getBody());
                resultCode = responseJson.path("response").path("header").path("resultCode").asText();
                if(!resultCode.equals("03")) {  //"03"아니면 반복 중단
                    break;
                }
            } catch(JsonProcessingException e) {
                throw new LookupException(JSON_PARSING_FAILED);
            }
            //resultCode가 "03"이면 1시간 빼고 재 시도
            if(resultCode.equals("03")) {
                LocalTime newBaseTime = LocalTime.parse(tempBaseTime, DateTimeFormatter.ofPattern("HHmm")).minusHours(1);
                tempBaseTime = newBaseTime.format(DateTimeFormatter.ofPattern("HHmm"));
            }

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

    public List<NowWeatherResDto> getFormattedNowWeather() {
        // 위치 정보
        GeoLocationResDto geoLocationResDto = geoLocationService.convertLocation();
        int nx = (int) geoLocationResDto.getNx();
        int ny = (int) geoLocationResDto.getNy();
        String r1 = geoLocationResDto.getR1();
        String r2 = geoLocationResDto.getR2();
        String r3 = geoLocationResDto.getR3();

        // 날씨 정보
        List<NowWeatherReqDto> weatherDataList = getNowWeather();

        // 날씨 데이터를 포맷
        return formatWeatherData(weatherDataList, nx, ny, r1, r2, r3);
    }

    private List<NowWeatherReqDto> parseJsonResponse(String response) {
        List<NowWeatherReqDto> nowWeatherList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode itemsNode = root.path("response").path("body").path("items").path("item");
            for(JsonNode item : itemsNode) {
                NowWeatherReqDto dto = NowWeatherReqDto.builder()
                                               .baseDate(item.path("baseDate").asText())
                                               .baseTime(item.path("baseTime").asText())
                                               .category(item.path("category").asText())
                                               .nx(item.path("nx").asInt())
                                               .ny(item.path("ny").asInt())
                                               .obsrValue(item.path("obsrValue").asText())
                                               .build();
                nowWeatherList.add(dto);
            }
        }catch(JsonProcessingException e){
            throw new LookupException(JSON_PARSING_FAILED);
        }
        return nowWeatherList;
    }

    public List<NowWeatherResDto> formatWeatherData(List<NowWeatherReqDto> weatherDataList, double nx, double ny, String r1, String r2, String r3) {
        NowWeatherResDto.NowWeatherResDtoBuilder builder = NowWeatherResDto.builder()
                                                                   .baseDate(baseDate)
                                                                   .baseTime(baseTime)
                                                                   .nx((int) nx)
                                                                   .ny((int) ny)
                                                                   .r1(r1)
                                                                   .r2(r2)
                                                                   .r3(r3);

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
