package com.example.demo.weather.service;

import com.example.demo.weather.dto.AirQualityDto;
import com.example.demo.weather.dto.GeoLocationResDto;
import com.example.demo.weather.dto.MonitoringStationDto;
import com.example.demo.weather.dto.TmLocationDto;
import com.example.demo.weather.exception.LookupException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static com.example.demo.weather.exception.enums.WeatherExeptionStatus.JSON_PARSING_FAILED;

@Service
@RequiredArgsConstructor
public class AirInfoService {

    private final RestTemplate restTemplate;
    private final GeoLocationService geoLocationService;

    private final String baseUrl = "https://apis.data.go.kr/B552584/MsrstnInfoInqireSvc";

    private final String ariQualityUrl = "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc";

    @Value("${weather.kma.serviceKey}")
    private String serviceKey;

    /* TM 좌표값 구하는 메소드 */
    public TmLocationDto getTmLocation(String clientIp) {
        // 위치 정보
        GeoLocationResDto geoLocationResDto = geoLocationService.convertLocation(clientIp);
        String r1 = geoLocationResDto.getR1();
        String r2 = geoLocationResDto.getR2();
        // 서비스 이름
        String serviceName = "/getTMStdrCrdnt";
        String url = baseUrl + serviceName + "?ServiceKey=" + serviceKey + "&returnType=json" + "&umdName=" + r1 + "+" + r2;
        // System.out.println("tm url : " + url);

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return parseJsonToTmLocationDto(response.getBody());
    }

    public TmLocationDto parseJsonToTmLocationDto(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode itemNode = root.path("response").path("body").path("items");
            JsonNode firstItem = itemNode.get(0);

            TmLocationDto dto = TmLocationDto.builder()
                                        .sidoName(firstItem.path("sidoName").asText())
                                        .sggName(firstItem.path("sggName").asText())
                                        .umdName(firstItem.path("umdName").asText())
                                        .tmX(firstItem.path("tmX").asDouble())
                                        .tmY(firstItem.path("tmY").asDouble())
                                        .build();
            return dto;
        } catch(Exception e) {
            e.printStackTrace();
            throw new LookupException(JSON_PARSING_FAILED);
        }
    }

    /* Tm 좌표값으로 측정소 찾는 메소드 */
    public MonitoringStationDto getStation(String clientIP) {
        // Tm 좌표 정보
        TmLocationDto tmLocationDto = getTmLocation(clientIP);
        String tmX = String.valueOf(tmLocationDto.getTmX());
        String tmY = String.valueOf(tmLocationDto.getTmY());
        String serviceName = "/getNearbyMsrstnList";
        String url = baseUrl + serviceName + "?ServiceKey=" + serviceKey + "&returnType=json" + "&tmX=" + tmX + "&tmY=" + tmY + "&ver=1.1";
        // System.out.println("stationUrl : " + url);

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return parseJsonToStationDto(response.getBody());
    }

    public MonitoringStationDto parseJsonToStationDto(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode itemNode = root.path("response").path("body").path("items");
            JsonNode firstItem = itemNode.get(0);

            MonitoringStationDto dto = MonitoringStationDto.builder()
                                               .stationCode(firstItem.path("stationCode").asText())
                                               .tm(firstItem.path("tm").asText())
                                               .addr(firstItem.path("addr").asText())
                                               .stationName((firstItem.path("stationName").asText()))
                                               .build();
            return dto;
        } catch(Exception e) {
            e.printStackTrace();
            throw new LookupException(JSON_PARSING_FAILED);
        }
    }

    /* 측정소 정보로 대기 정보 조회 */
    public AirQualityDto getAirQuality(String clientIp) {
        // 측정소 이름 조회
        MonitoringStationDto stationDto = getStation(clientIp);
        String stationName = stationDto.getStationName();
        String serviceName = "/getMsrstnAcctoRltmMesureDnsty";
        String url = ariQualityUrl + serviceName + "?ServiceKey=" + serviceKey + "&returnType=json" + "&stationName=" + stationName + "&dataTerm=DAILY&ver=1.4";
        // System.out.println("airQualityUrl : " + url);

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return parseJsonToAirQualityDto(response.getBody());
    }

    public AirQualityDto parseJsonToAirQualityDto(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode itemNode = root.path("response").path("body").path("items");
            JsonNode firstItem = itemNode.get(0);

            String pm25Grade = convertGrade(firstItem.path("pm25Grade").asText());
            String pm10Grade = convertGrade(firstItem.path("pm10Grade").asText());
            String coGrade = convertGrade(firstItem.path("coGrade").asText());
            String no2Grade = convertGrade(firstItem.path("no2Grade").asText());
            String o3Grade = convertGrade(firstItem.path("o3Grade").asText());
            String so2Grade = convertGrade(firstItem.path("so2Grade").asText());
            String khaiGrade = convertGrade(firstItem.path("khaiGrade").asText());

            AirQualityDto dto = AirQualityDto.builder()
                                        .pm25Value(firstItem.path("pm25Value").asText())
                                        .pm25Grade(pm25Grade)
                                        .pm10Value(firstItem.path("pm10Value").asText())
                                        .pm10Grade(pm10Grade)
                                        .coValue(firstItem.path("coValue").asText())
                                        .coGrade(coGrade)
                                        .no2Value(firstItem.path("no2Value").asText())
                                        .no2Grade(no2Grade)
                                        .o3Value(firstItem.path("o3Value").asText())
                                        .o3Grade(o3Grade)
                                        .so2Value(firstItem.path("so2Value").asText())
                                        .so2Grade(so2Grade)
                                        .khaiValue(firstItem.path("khaiValue").asText())
                                        .khaiGrade(khaiGrade)
                                        .dataTime(firstItem.path("dataTime").asText())
                                        .stationCode(firstItem.path("stationCode").asText())
                                        .stationName(firstItem.path("stationName").asText())
                                        .build();
            return dto;
        } catch(Exception e) {
            e.printStackTrace();
            throw new LookupException(JSON_PARSING_FAILED);
        }
    }

    public String convertGrade(String grade) {
        return switch(grade) {
            case "1" -> "좋음";
            case "2" -> "보통";
            case "3" -> "나쁨";
            case "4" -> "매우 나쁨";
            default -> "통신 장애";
        };
    }

}
