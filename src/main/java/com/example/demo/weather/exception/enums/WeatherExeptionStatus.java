package com.example.demo.weather.exception.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum WeatherExeptionStatus {

    // 4XX
    WEATHER_API_NODATA_ERROR(404, "데이터 없음 에러"),
    WEATHER_API_INVALID_REQUEST_PARAMETER_ERROR(400, "잘못된 요청 파라메터 에러"),
    WEATHER_API_NO_MANDATORY_REQUEST_PARAMETERS_ERROR(400, "필수 요청 파라메터가 없음"),
    WEATHER_API_NO_OPENAPI_SERVICE_ERROR(410, "해당 오픈API 서비스가 없거나 폐기됨"),
    WEATHER_API_SERVICE_ACCESS_DENIED_ERROR(403, "서비스 접근 거부"),
    WEATHER_API_LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR(429, "서비스 요청 제한 횟수 초과 에러"),
    WEATHER_API_SERVICE_KEY_IS_NOT_REGISTERED_ERROR(401, "등록되지 않은 서비스키"),
    WEATHER_API_DEADLINE_HAS_EXPIRED_ERROR(403, "기한 만료된 서비스키"),
    WEATHER_API_UNREGISTERED_IP_ERROR(403, "등록되지 않은 IP"),
    WEATHER_API_UNSIGNED_CALL_ERROR(401, "서명되지 않은 호출"),

    // 5XX
    IP_LOOKUP_FAILED(500, "IP 조회 실패"),
    JSON_PARSING_FAILED(500, "JSON 파싱 실패"),
    WEATHER_INFO_LOOKUP_FAILED(500, "날씨 정보 조회 실패"),
    LOCATION_INFO_LOOKUP_FAILED(500, "위치 정보 조회 실패"),
    DATA_RETRIEVAL_FAILED(500,"IO 오류로 인해 데이터를 검색하지 못했습니다"),
    WEATHER_API_APPLICATION_ERROR(500, "어플리케이션 에러"),
    WEATHER_API_DB_ERROR(500, "데이터베이스 에러"),
    WEATHER_API_HTTP_ERROR(500, "HTTP 에러"),
    WEATHER_API_SERVICE_TIME_OUT(504, "서비스 연결 실패 에러"),
    WEATHER_API_TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR(503, "일시적으로 사용할 수 없는 서비스 키"),
    WEATHER_API_UNKNOWN_ERROR(500, "기타 에러");

    private final int statusCode;
    private final String message;
}