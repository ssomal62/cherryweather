package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import static com.example.demo.common.log.CherryLogger.logServerStart;

@SpringBootApplication
public class CherryWeatherApplication {

	public static void main(String[] args) {
		SpringApplication.run(CherryWeatherApplication.class, args);
		logServerStart();
	}

}
