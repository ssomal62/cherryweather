package com.example.demo.event.enums;

import lombok.Getter;

@Getter
public enum Weather {


    SUNNY("맑음"),
    CLOUDY("흐림"),
    RAINY("비"),
    SLEET("비/눈"),
    SNOW("눈"),
    SHOWER("소나기");


    private final String description;

    Weather(String description) {
        this.description = description;
    }

}
