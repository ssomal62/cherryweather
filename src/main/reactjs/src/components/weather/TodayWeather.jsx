import React, {useEffect} from 'react';
import {Spinner} from "@nextui-org/react";
import {dailyWeatherState, UseWeatherData} from "../../recoil/hooks/UseWeatherData";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import styled from "styled-components";
import {useRecoilValue} from "recoil";

const TodayWeather = () => {
    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const fetchData = UseWeatherData({endpoint:`/weather/daily?ip=${clientIp}`, state: dailyWeatherState});
    const {data, loading, error} = useRecoilValue((dailyWeatherState))
    // const navigate = useNavigate();


    useEffect(() => {
        if (clientIp) {
            fetchData();
        }
    }, [fetchData, clientIp]);

    // //현재 낮인지 밤인지 판별
    // const isDaytime = () => {
    //     if (!data) return true;
    //     const now = new Date();
    //     const sunrise = new Date(now.toDateString() + ' ' + data.sunrise);
    //     const sunset = new Date(now.toDateString() + ' ' + data.sunset);
    //     return now >= sunrise && now <= sunset;
    // }

    return (
        <TodayInfo>
            {loading && (
                <Spinner className = "h-[100%] w-[100%]" label = "Loading..." color = "danger"/>
            )}
            {error && (
                <div className = "h-[100%] w-[100%]">error : {error.message}</div>
            )}
            {data && (
                <div>
                    <WeatherIcon>
                        아이콘
                    </WeatherIcon>
                    <Temperature>
                        {data.currentTemp}℃<br/>
                    </Temperature>
                    <HighLowTemperature>
                        {data.minTemp}℃ / {data.maxTemp}℃
                    </HighLowTemperature>
                    <Location>
                        <Area>
                            {data.area}
                        </Area>
                        <City>
                            {data.city}
                        </City>
                    </Location>
                    <WeatherInfo>
                        {data.weather}
                    </WeatherInfo>
                </div>
            )}
        </TodayInfo>
    );
};

export default TodayWeather;

const TodayInfo = styled.div`
    position: relative;
    height: 400px;
`;

const Temperature = styled.div`
    font-size: 4.3em;
    color: white;
    position: absolute;
    text-shadow: 0 0 4px black;
    right: 7%;
    top: 20%;
`;

const HighLowTemperature = styled.div`
    font-size: 1em;
    color: white;
    position: absolute;
    text-shadow: 0 0 4px black;
    left: 5%;
    bottom: 7%;
`;

const Location = styled.div`
    //font-size: 1.6em;
    color: white;
    position: absolute;
    text-shadow: 0 0 4px black;
    right: 7%;
    top: 45%;
`;

const Area = styled.div`
    font-size: 1.6em;
`;

const City = styled.div`
    font-size: 1.2em;
    position: absolute;
    right: 0%
`;

const WeatherInfo = styled.div`
    font-size: 1.8em;
    color: white;
    position: absolute;
    text-shadow: 0 0 4px black;
    right: 7%;
    bottom: 7%
`;

const WeatherIcon = styled.div`
    position: absolute;
`;
