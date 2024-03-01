import React, {useEffect} from 'react';
import {Spinner} from "@nextui-org/react";
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
// import {useNavigate} from "react-router-dom";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import styled from "styled-components";

// //시간 포맷 함수
// const formatTime = (time) => {
//     if (!time) return '';
//     const timeString = time.toString();
//     const hours = timeString.slice(0, 2);
//     const minutes = timeString.slice(2);
//     return `${hours}:${minutes.padStart(2, '0')}`;
// }
const TodayWeather = () => {

    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const {fetchData, data, loading, error} = UseFetchWeather(`/weather/daily?ip=${clientIp}`);
    // const navigate = useNavigate();

    // // 이동 함수
    // const handleCardClick = () => {
    //     navigate('/weatherDetail');
    // }

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

    // //날씨와 시간에 따라 배경 이미지 변경
    // const getBackgroundImage = () => {
    //     if (!data) return require('../../assets/images/weather/background/clear_day.jpg'); // data가 없는 경우 기본 이미지 반환
    //
    //     const weather = data.weather;
    //     const timeOfDay = isDaytime() ? 'day' : 'night';
    //     switch (weather) {
    //         case "맑음":
    //             return timeOfDay === 'day' ? require('../../assets/images/weather/background/clear_day.jpg') : require('../../assets/images/weather/background/clear_night.jpg');
    //         case "흐림":
    //             return timeOfDay === 'day' ? require('../../assets/images/weather/background/cloudy_day.jpg') : require('../../assets/images/weather/background/cloudy_night.jpg');
    //         case "비":
    //             return timeOfDay === 'day' ? require('../../assets/images/weather/background/rainy_day.jpg') : require('../../assets/images/weather/background/rainy_night.jpg');
    //         case "눈":
    //             return timeOfDay === 'day' ? require('../../assets/images/weather/background/snow_day.jpg') : require('../../assets/images/weather/background/snow_night.jpg');
    //         case "비/눈":
    //             return timeOfDay === 'day' ? require('../../assets/images/weather/background/snow_day.jpg') : require('../../assets/images/weather/background/snow_night.jpg');
    //         case "소나기":
    //             return timeOfDay === 'day' ? require('../../assets/images/weather/background/rainy_day.jpg') : require('../../assets/images/weather/background/rainy_night.jpg');
    //         default:
    //             return timeOfDay === 'day' ? require('../../assets/images/weather/background/clear_day.jpg') : require('../../assets/images/weather/background/clear_night.jpg');
    //     }
    // };

    // backgroundImage 스타일 동적으로 설정
    // const cardStyle = {
    //     backgroundImage: `url(${getBackgroundImage()})`
    // };


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
