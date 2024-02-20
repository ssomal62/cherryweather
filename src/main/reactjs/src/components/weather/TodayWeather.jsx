import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardFooter, Spinner} from "@nextui-org/react";
import styled from "styled-components";


const TodayWeather = () => {

    const [dailyWeather, setDailyWeather] = useState(null);

    useEffect(() => {
        //데이터 불러오기
        const fetchDailyWeather = async () => {
            try {
                // 엔드포인트로 데이터 요청
                const response = await fetch('http://192.168.0.46:9002/api/weather/daily');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json()

                const sunrise = formatTime(data.sunrise);
                const sunset = formatTime(data.sunset);
                setDailyWeather({...data, sunrise, sunset});
            } catch (error) {
                console.error("Fetching daily weather failed: ", error);
            }
        };
        //데이터를 불러오는 함수를 호출
        fetchDailyWeather();
    }, []);  // 처음 한번만 실행

    //시간 포맷 함수
    function formatTime(time) {
        const timeString = time.toString();
        const hours = timeString.slice(0, 2);
        const minutes = timeString.slice(2);
        return `${hours}:${minutes.padStart(2, '0')}`;

    }

    //현재 낮인지 밤인지 판별
    const isDaytime = () => {

        const now = new Date();
        const sunrise = new Date(now.toDateString() + ' ' + dailyWeather.sunrise);
        const sunset = new Date(now.toDateString() + ' ' + dailyWeather.sunset);
        return now >= sunrise && now <= sunset;
    }


    //날씨와 시간에 따라 배경 이미지 변경
    const getBackgroundImage = () => {
        const weather = dailyWeather.weather;
        const timeOfDay = isDaytime() ? 'day' : 'night';
        switch (weather) {
            case "맑음":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/clear_day.jpg') : require('../../assets/images/weather/background/clear_night.jpg');
            case "흐림":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/cloudy_day.jpg') : require('../../assets/images/weather/background/cloudy_night.jpg');
            case "비":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/rainy_day.jpg') : require('../../assets/images/weather/background/rainy_night.jpg');
            case "눈":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/snow_day.jpg') : require('../../assets/images/weather/background/snow_night.jpg');
            case "비/눈":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/snow_day.jpg') : require('../../assets/images/weather/background/snow_night.jpg');
            case "소나기":
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/rainy_day.jpg') : require('../../assets/images/weather/background/rainy_night.jpg');
            default:
                return timeOfDay === 'day' ? require('../../assets/images/weather/background/clear_day.jpg') : require('../../assets/images/weather/background/clear_night.jpg');
        }
    };

    //데이터가 없는 경우 or 로딩 중일 경우
    if (!dailyWeather) {
        return <div>
            <Card className = "py-4">
                <CardBody className = "overflow-visible py-2" style = {{height: '210px'}}>
                    <Spinner label = "Loading..." color = "danger" className = "mt-16"/>
                </CardBody>
            </Card>
        </div>; // 로딩 중 표시 문구 출력
    }

    // backgroundImage 스타일 동적으로 설정
    const cardStyle = {
        backgroundImage: `url(${getBackgroundImage()})`
    };
    //데이터가 있는 경우
    return (
        <div>
            <Card className = "py-4 weatherInfo" style = {cardStyle}>
                <CardBody className = "overflow-visible py-2 relative" style = {{height: '210px'}}>
                    <div className = "font-sans text-6xl font-bold text-white/90 text-shadow-small absolute" style = {{textShadow: '0 0 4px black'}}>
                        {dailyWeather.currentTemp}℃
                    </div>
                    <div className = "absolute right-4">
                        <img src = {require('../../assets/images/weather/icon/snow.gif')} alt = "" style={{width:'100px'}}/>
                    </div>
                    <div
                        className = "font-sans text-medium text-white/90 text-shadow-small absolute bottom-14 left-4" style = {{textShadow: '0 0 4px black'}}>
                        L : {dailyWeather.minTemp}℃ / H : {dailyWeather.maxTemp}℃
                    </div>
                    <div className = "font-sans text-xl text-white/90 text-shadow-small absolute bottom-7 left-4" style = {{textShadow: '0 0 4px black'}}>
                        <span className = "text-2xl">{dailyWeather.area}</span>, <span className = "text-medium">{dailyWeather.city}</span>
                    </div>
                    <div className = "font-sans text-xl text-white/90 text-shadow-small absolute bottom-7 right-3" style = {{textShadow: '0 0 4px black'}}>
                        {dailyWeather.weather}
                    </div>
                </CardBody>
                <CardFooter
                    className = "justify-between bg-white/50 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <img alt = "" src = {require('../../assets/images/weather/icon/sunrise.png')} style = {{width: '20px'}}/> : <small>{dailyWeather.sunrise}</small>
                    <img alt = "" src = {require('../../assets/images/weather/icon/sunset.png')} style = {{width: '20px'}}/> : <small>{dailyWeather.sunset}</small>
                    <img alt = "" src = {require('../../assets/images/weather/icon/wind.png')} style = {{width: '20px'}}/> : <small>{dailyWeather.windSpeed}m/s</small>
                    <img alt = "" src = {require('../../assets/images/weather/icon/umbrellar.png')} style = {{width: '20px'}}/> : <small>{dailyWeather.rainProbability}%
                                                                                                                                                                       / {dailyWeather.rainfall}</small>
                </CardFooter>
            </Card>
        </div>
    );
};

export default TodayWeather;

export const TodayWeatherWiget = styled.div`
`;

export const TimeB = styled.div`
`;
