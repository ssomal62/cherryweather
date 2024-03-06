import React, {useEffect} from 'react';
import {Card, Spinner} from "@nextui-org/react";
import {airQualityState, dailyWeatherState, UseWeatherData} from "../../recoil/hooks/UseWeatherData";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import styled from "styled-components";
import {useRecoilValue} from "recoil";

const TodayWeather = () => {
    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const DailyFetchData = UseWeatherData({endpoint: `/weather/daily?ip=${clientIp}`, state: dailyWeatherState});
    const AirQualityFetchData = UseWeatherData({endpoint: `/air/airquality?ip=${clientIp}`, state: airQualityState});
    const {data: dailyData, loading: dailyLoading, error: dailyError} = useRecoilValue((dailyWeatherState))
    const {data: airData, loading: airLoading, error: airError} = useRecoilValue((airQualityState))

    useEffect(() => {
        if (clientIp) {
            DailyFetchData();
            AirQualityFetchData();
        }
    }, [DailyFetchData, AirQualityFetchData, clientIp]);

    function formatTemperature(temp) {
        return Math.round(temp); // Math.round를 사용하여 가장 가까운 정수로 반올림
    }

    function getWeatherIconName(weather) {
        switch (weather) {
            case '맑음':
                return 'clear';
            case '흐림':
            case '구름많음':
                return 'cloudy';
            case '비':
            case '구름많고 비':
            case '흐리고 비':
                return 'rainy';
            case '비/눈':
            case '구름많고 비/눈':
            case '흐리고 비/눈':
                return 'rainy-snowy';
            case '눈':
            case '구름많고 눈':
            case '흐리고 눈':
                return 'snowy';
            case '소나기':
            case '구름많고 소나기':
            case '흐리고 소나기':
                return 'shower';
            default:
                return 'clear'; // 기본값 설정
        }
    }

    function formatTime(timeStr) {
            return `${timeStr.substring(0, 2)}:${timeStr.substring(2)}`;
    }



    console.log("daily : ", dailyData);
    console.log("ip : ", clientIp);
    return (
        <TodayInfo>
            {dailyLoading && (
                <Spinner className = "h-[100%] w-[100%]" label = "Loading..." color = "danger"/>
            )}
            {airLoading && (
                <Spinner className = "h-[100%] w-[100%]" label = "Loading..." color = "danger"/>
            )}
            {dailyError && (
                <div className = "h-[100%] w-[100%]">error : Daily - {dailyError.message}</div>
            )}
            {airError && (
                <div className = "h-[100%] w-[100%]">error : AirQuality - {airError.message}</div>
            )}
            {dailyData && airData && (
                <Container>
                    <WeatherInfo isBlurred>
                        <WeatherHeader>
                            날씨
                        </WeatherHeader>
                        <WeatherBody>
                            <WeatherData>
                                <p style = {{fontSize: '1.1rem'}}>{dailyData.weather}</p>
                            </WeatherData>
                            <WeatherIcon>
                                <IconDiv>
                                    <img src = "https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/detail/weather.png"
                                         alt = "weather"
                                         style = {{width: '70%'}}/>
                                </IconDiv>
                            </WeatherIcon>
                        </WeatherBody>
                    </WeatherInfo>
                    <Temperature isBlurred>
                        <WeatherHeader>
                            온도
                        </WeatherHeader>
                        <WeatherBody>
                            <WeatherData>
                                <p style = {{fontSize: '1.1rem'}}>{dailyData.currentTemp}℃</p>
                            </WeatherData>
                            <WeatherIcon>
                                <IconDiv>
                                    <img src = "https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/detail/temp.png" alt = "temp"
                                         style = {{width: '70%'}}/>
                                </IconDiv>
                            </WeatherIcon>
                        </WeatherBody>
                    </Temperature>
                    <HighLowTemperature isBlurred>
                        <WeatherHeader>
                            최저/최고
                        </WeatherHeader>
                        <WeatherBody>
                            <WeatherData>
                                <p style = {{fontSize: '1.1rem'}}>
                                     {formatTemperature(dailyData.minTemp)}℃ / {formatTemperature(dailyData.maxTemp)}℃
                                </p>
                            </WeatherData>
                            <WeatherIcon>
                                <IconDiv>
                                    <img src = "https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/detail/maxmin.png" alt = "maxmin"
                                         style = {{width: '70%'}}/>
                                </IconDiv>
                            </WeatherIcon>
                        </WeatherBody>
                    </HighLowTemperature>
                    <AirQuality isBlurred>
                        <WeatherHeader>
                            미세/초미세(㎍/㎥)
                        </WeatherHeader>
                        <WeatherBody>
                            <WeatherData>
                                <p style = {{fontSize: '0.8rem'}}>
                                    {airData.pm10Grade} / {airData.pm10Value}<br/>
                                    {airData.pm25Grade} / {airData.pm25Value}
                                </p>
                            </WeatherData>
                            <WeatherIcon>
                                <IconDiv>
                                    <img src = "https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/detail/mask.png" alt = "mask"
                                         style = {{width: '70%'}}/>
                                </IconDiv>
                            </WeatherIcon>
                        </WeatherBody>
                    </AirQuality>
                    <Rain isBlurred>
                        <WeatherHeader>
                            강수확률
                        </WeatherHeader>
                        <WeatherBody>
                            <WeatherData>
                                <p style = {{fontSize: '0.8rem'}}>
                                    {dailyData.rainProbability}%<br/>
                                    {dailyData.rainfall}
                                </p>
                            </WeatherData>
                            <WeatherIcon>
                                <IconDiv>
                                    <img src = "https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/detail/rain.png" alt = "rain"
                                         style = {{width: '70%'}}/>
                                </IconDiv>
                            </WeatherIcon>
                        </WeatherBody>
                    </Rain>
                    <Sunrise isBlurred>
                        <WeatherHeader>
                            일출/일몰
                        </WeatherHeader>
                        <WeatherBody>
                            <WeatherData><p style = {{fontSize: '0.8rem'}}>
                                {formatTime(dailyData.sunrise)} <br/>
                                {formatTime(dailyData.sunset)}
                            </p>
                            </WeatherData>
                            <WeatherIcon>
                                <IconDiv>
                                    <img src = "https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/detail/sunrise.png" alt = "sunrise"
                                         style = {{width: '70%'}}/>
                                </IconDiv>
                            </WeatherIcon>
                        </WeatherBody>
                    </Sunrise>
                    <Humidity isBlurred>
                        <WeatherHeader>
                            습도
                        </WeatherHeader>
                        <WeatherBody>
                            <WeatherData>
                                <p style = {{fontSize: '1.1rem'}}>
                                    {dailyData.humidity}%
                                </p>
                            </WeatherData>
                            <WeatherIcon>
                                <IconDiv>
                                    <img src = "https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/detail/humidity.png" alt = "humidity"
                                         style = {{width: '70%'}}/>
                                </IconDiv>
                            </WeatherIcon>
                        </WeatherBody>
                    </Humidity>
                    <Wind isBlurred>
                        <WeatherHeader>
                            바람
                        </WeatherHeader>
                        <WeatherBody>
                            <WeatherData>
                                <p style = {{fontSize: '1.1rem'}}>
                                    {dailyData.windSpeed}m/s
                                </p>
                            </WeatherData>
                            <WeatherIcon>
                                <IconDiv>
                                    <img src = "https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/detail/wind.png" alt = "wind"
                                         style = {{width: '70%'}}/>
                                </IconDiv>
                            </WeatherIcon>
                        </WeatherBody>
                    </Wind>
                </Container>
            )}
        </TodayInfo>
    );
};

export default TodayWeather;

const TodayInfo = styled.div`
    position: relative;
    height: 500px;
    padding-top: 13%;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const Temperature = styled(Card)`
    width: 39%;
    height: 18%;
    position: absolute;
    right: 8%;
    top: 8%;
`;

const HighLowTemperature = styled(Card)`
    width: 39%;
    height: 18%;
    position: absolute;
    left: 8%;
    top: 31%;
`;

const WeatherInfo = styled(Card)`
    position: absolute;
    width: 39%;
    height: 18%;
    left: 8%;
    top: 8%;
`;

const AirQuality = styled(Card)`
    position: absolute;
    width: 39%;
    height: 18%;
    right: 8%;
    top: 31%;
`;
const Rain = styled(Card)`
    position: absolute;
    width: 39%;
    height: 18%;
    left: 8%;
    top: 54%;
`;
const Sunrise = styled(Card)`
    position: absolute;
    width: 39%;
    height: 18%;
    right: 8%;
    top: 54%;
`;

const Humidity = styled(Card)`
    position: absolute;
    width: 39%;
    height: 18%;
    left: 8%;
    top: 77%;
`;

const Wind = styled(Card)`
    position: absolute;
    width: 39%;
    height: 18%;
    right: 8%;
    top: 77%;
`;
const WeatherHeader = styled.div`
    width: 100%;
    height: 30%;
    color: darkgrey;
    font-size: 0.6em;
    padding-top: 10%;
    display: flex;
    align-items: center;
    padding-left: 10%;
`;
const WeatherBody = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const WeatherData = styled.div`
    flex: 65%;
    //font-size: 1em;
    display: flex;
    align-items: center;
    padding-left: 10%;
    font-weight: bold;

`;
const WeatherIcon = styled.div`
    flex: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const IconDiv = styled.div`
    width: 100%;
    height: 100%;
    //border: 1px solid lightgrey;
    //border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;