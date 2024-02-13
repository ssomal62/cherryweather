package com.example.demo.weather.service;

import com.example.demo.weather.dto.GeoLocationReqDto;
import com.example.demo.weather.dto.GeoLocationResDto;
import org.springframework.stereotype.Service;

/*
    GeoLoation으로 획득한 위도, 경도값을 기상청 API에 맞는 좌표값으로 변환하기 위한 클래스
*/

@Service
public class GeoConverter {
    private static final double RE = 6371.00877; // 지구 반경(km)
    private static final double GRID = 5.0; // 격자 간격(km)
    private static final double SLAT1 = 30.0; // 투영 위도1(degree)
    private static final double SLAT2 = 60.0; // 투영 위도2(degree)
    private static final double OLON = 126.0; // 기준점 경도(degree)
    private static final double OLAT = 38.0; // 기준점 위도(degree)
    private static final double XO = 43; // 기준점 X좌표(GRID)
    private static final double YO = 136; // 기준점 Y좌표(GRID)

    public GeoLocationResDto toXY(GeoLocationReqDto reqDto) {
        double lat = reqDto.getLat();
        double lon = reqDto.getLon();

        // 좌표 변환 로직
        double DEGRAD = Math.PI / 180.0;
        // double RADDEG = 180.0 / Math.PI;

        double re = RE / GRID;
        double slat1 = SLAT1 * DEGRAD;
        double slat2 = SLAT2 * DEGRAD;
        double olon = OLON * DEGRAD;
        double olat = OLAT * DEGRAD;

        double sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        double sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
        double ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
        ro = re * sf / Math.pow(ro, sn);

        double ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
        ra = re * sf / Math.pow(ra, sn);
        double theta = lon * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;

        double nx = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        double ny = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

        return GeoLocationResDto.builder()
                       .r1(reqDto.getR1())
                       .r2(reqDto.getR2())
                       .r3(reqDto.getR3())
                       .nx(nx)
                       .ny(ny)
                       .build();
    }
}