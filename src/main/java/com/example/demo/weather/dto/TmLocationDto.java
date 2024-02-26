package com.example.demo.weather.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TmLocationDto {

    private String sidoName;
    private String sggName;
    private String umdName;
    private double tmX;
    private double tmY;

}
