package com.example.demo.weather.service;

import com.example.demo.weather.dto.*;
import com.example.demo.weather.exception.LookupException;
import com.example.demo.weather.exception.enums.WeatherExeptionStatus;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.demo.weather.exception.enums.WeatherExeptionStatus.*;

@Service
@RequiredArgsConstructor
public class TodayWeatherServie {

    private final GeoLocationService geoLocationService;
    private final WeatherServiceClient weatherServiceClient;
    private final DaylightService daylightService;

    private final String baseDate = LocalDate.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    private final String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

    /* 오늘 단기 예보 조회*/
    public List<TodayWeatherReqDto> getTodayWeather() {

        String functionName = "getVilageFcst";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseJson = null;
        String resultCode;

        GeoLocationResDto geoLocationResDto = geoLocationService.convertLocation();
        int nx = (int) geoLocationResDto.getNx();
        int ny = (int) geoLocationResDto.getNy();
        String ip = geoLocationResDto.getIp();

        ResponseEntity<String> response = weatherServiceClient.getTodayWeatherForecast(functionName, baseDate, nx, ny);
        try {
            responseJson = objectMapper.readTree(response.getBody());
            resultCode = responseJson.path("response").path("header").path("resultCode").asText();
        } catch(JsonProcessingException e) {
            throw new LookupException(WeatherExeptionStatus.JSON_PARSING_FAILED);
        }

        // resultCode에 따른 예외 처리
        return switch(resultCode) {
            case "00" -> // 정상 처리
                    parseJsonResponse(response.getBody(), ip);
            case "01" -> throw new LookupException(WEATHER_API_APPLICATION_ERROR);
            case "02" -> throw new LookupException(WEATHER_API_DB_ERROR);
            case "03" -> throw new LookupException(WEATHER_API_NODATA_ERROR);
            case "04" -> throw new LookupException(WEATHER_API_HTTP_ERROR);
            case "05" -> throw new LookupException(WEATHER_API_SERVICE_TIME_OUT);
            case "10" -> throw new LookupException(WEATHER_API_INVALID_REQUEST_PARAMETER_ERROR);
            case "11" -> throw new LookupException(WEATHER_API_NO_MANDATORY_REQUEST_PARAMETERS_ERROR);
            case "12" -> throw new LookupException(WEATHER_API_NO_OPENAPI_SERVICE_ERROR);
            case "20" -> throw new LookupException(WEATHER_API_SERVICE_ACCESS_DENIED_ERROR);
            case "21" -> throw new LookupException(WEATHER_API_TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR);
            case "22" -> throw new LookupException(WEATHER_API_LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR);
            case "30" -> throw new LookupException(WEATHER_API_SERVICE_KEY_IS_NOT_REGISTERED_ERROR);
            case "31" -> throw new LookupException(WEATHER_API_DEADLINE_HAS_EXPIRED_ERROR);
            case "32" -> throw new LookupException(WEATHER_API_UNREGISTERED_IP_ERROR);
            case "33" -> throw new LookupException(WEATHER_API_UNSIGNED_CALL_ERROR);
            default -> throw new LookupException(WEATHER_API_UNKNOWN_ERROR);
        };
    }

    /* GeoLocation을 사용해서 위치값 받아오기*/
    public List<TodayWeatherResDto> getFormattedTodayWeather() {
        GeoLocationResDto geoLocationResDto = geoLocationService.convertLocation();
        int nx = (int) geoLocationResDto.getNx();
        int ny = (int) geoLocationResDto.getNy();
        String r1 = geoLocationResDto.getR1();
        String r2 = geoLocationResDto.getR2();
        String r3 = geoLocationResDto.getR3();
        String ip = geoLocationResDto.getIp();

        List<TodayWeatherReqDto> weatherDataList = getTodayWeather();

        return formatWeatherData(weatherDataList, nx, ny, r1, r2, r3, ip);
    }

    /* JSON 데이터로 파싱 */
    private List<TodayWeatherReqDto> parseJsonResponse(String response, String ip) {
        List<TodayWeatherReqDto> todayWeatherList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();

        try {

            JsonNode root = objectMapper.readTree(response);
            JsonNode itemsNode = root.path("response").path("body").path("items").path("item");
            for(JsonNode item : itemsNode) {
                String fcstDate = item.path("fcstDate").asText();
                if(!fcstDate.equals(baseDate)) {
                    TodayWeatherReqDto dto = TodayWeatherReqDto.builder()
                                                     .baseDate(item.path("baseDate").asText())
                                                     .baseTime(item.path("baseTime").asText())
                                                     .category(item.path("category").asText())
                                                     .fcstDate(fcstDate)
                                                     .fcstTime(item.path("fcstTime").asText())
                                                     .fcstValue(item.path("fcstValue").asText())
                                                     .nx(item.path("nx").asInt())
                                                     .ny(item.path("ny").asInt())
                                                     .ip(ip)
                                                     .build();
                    todayWeatherList.add(dto);
                }
            }
        } catch(JsonProcessingException e) {
            throw new LookupException(JSON_PARSING_FAILED);
        }
        return todayWeatherList;
    }

    /* 모든 값을 받아와서 ResDto 생성 */
    public List<TodayWeatherResDto> formatWeatherData(List<TodayWeatherReqDto> weatherDataList, int nx, int ny, String r1, String r2, String r3, String ip) {
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
                                                            .r3(r3)
                                                            .ip(ip));

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

    /* 현재 날씨 요약 정보 */
    public DailyWeatherDto getDailyWeather(List<TodayWeatherResDto> todayWeatherList) {
        DailyWeatherDto.DailyWeatherDtoBuilder builder = DailyWeatherDto.builder();
        String minTemp = null;
        String maxTemp = null;

        DaylightDto daylightDto = daylightService.getDaylightInfo(geoLocationService.getGeoLocation());

        for(TodayWeatherResDto todayWeather : todayWeatherList) {
            // 최저 기온, 최고 기온 찾기
            if(todayWeather.getTMX() != null && maxTemp == null) maxTemp = todayWeather.getTMX();
            if(todayWeather.getTMN() != null && minTemp == null) minTemp = todayWeather.getTMN();
        }

        for(TodayWeatherResDto todayWeather : todayWeatherList) {

            // 현재 시각에 해당하는 날씨 정보 설정
            if(isCurrentForecast(todayWeather)) {
                builder.city(todayWeather.getR1())
                        .area(todayWeather.getR2())
                        .weather(getWeatherCondition(todayWeather.getPTY(), todayWeather.getSKY()))
                        .currentTemp(todayWeather.getTMP())
                        .windDirection(todayWeather.getVEC())
                        .windSpeed(todayWeather.getWSD())
                        .rainProbability(todayWeather.getPOP())
                        .rainfall(todayWeather.getPCP())
                        .humidity(todayWeather.getREH())
                        .ip(todayWeather.getIp());
                break; // 현재 시각에 해당하는 날씨 정보만 설정하고 반복문
            }
        }

        builder.sunrise(daylightDto.getSunrise())
                .sunset(daylightDto.getSunset())
                .moonrise(daylightDto.getMoonrise())
                .moonset(daylightDto.getMoonset());

        return builder.minTemp(minTemp)
                       .maxTemp(maxTemp)
                       .build();
    }

    public boolean isCurrentForecast(TodayWeatherResDto todayWeather) {
        String currentHour = LocalTime.now().format(DateTimeFormatter.ofPattern("HH00"));
        return Objects.equals(todayWeather.getFcstTime(), currentHour);
    }

    /* PTY, SKY 값을 기준으로 날씨 지정 */
    public String getWeatherCondition(String pty, String sky) {
        return switch(pty) {
            case "0" -> "1".equals(sky) ? "맑음" : "흐림";
            case "1" -> "비";
            case "2" -> "비/눈";
            case "3" -> "눈";
            case "4" -> "소나기";
            default -> "날씨 정보 조회 실패";
        };
    }

    /* 오늘 시간별 날씨 */
    public List<HourlyWeatherDto> getHourlyWeather() {
        List<TodayWeatherReqDto> rawForcastData = getTodayWeather();
        Map<String, HourlyWeatherDto.HourlyWeatherDtoBuilder> dtoMap = new HashMap<>();

        // 현재 시간 및 날짜
        LocalDateTime currentDateTime = LocalDateTime.now().minusHours(1);
        LocalDateTime endDateTime = currentDateTime.plusHours(25);  // 다음 24시간 계산

        // 카테고리 값을 저장하기 위한 임시 구조
        Map<String, Map<String, String>> categoryValues = new HashMap<>();


        for(TodayWeatherReqDto data : rawForcastData) {
            LocalDateTime forecastDateTime = LocalDateTime.of(
                    LocalDate.parse(data.getFcstDate(), DateTimeFormatter.ofPattern("yyyyMMdd")),
                    LocalTime.parse(data.getFcstTime(), DateTimeFormatter.ofPattern("HH00"))
            );

            // 현재 시간부터 24시간 이내의 데이터만 처리
            if(!forecastDateTime.isBefore(currentDateTime) && forecastDateTime.isBefore(endDateTime)) {
                String key = data.getFcstDate() + "-" + data.getFcstTime();
                categoryValues.computeIfAbsent(key, k -> new HashMap<>()).put(data.getCategory(), data.getFcstValue());

                //빌더가 없으면 생성
                dtoMap.computeIfAbsent(key, k -> HourlyWeatherDto.builder()
                                                        .fcstDate(data.getFcstDate())
                                                        .fcstTime(data.getFcstTime()));

                // 데이터 처리 후 weather 값을 설정
                dtoMap.forEach((k, builder) -> {
                    Map<String, String> values = categoryValues.get(k);
                    String pty = values.getOrDefault("PTY", "0");
                    String sky = values.getOrDefault("SKY", "1");
                    String tmp = values.getOrDefault("TMP", "");

                    builder.tmp(tmp)
                            .pty(pty)
                            .sky(sky)
                            .weather(getWeatherCondition(pty, sky));
                });

            }
        }

        return dtoMap.values().stream()
                       .map(HourlyWeatherDto.HourlyWeatherDtoBuilder::build)
                       .sorted(Comparator.comparing(HourlyWeatherDto::getFcstDate)
                                       .thenComparing(HourlyWeatherDto::getFcstTime))
                       .collect(Collectors.toList());
    }
}