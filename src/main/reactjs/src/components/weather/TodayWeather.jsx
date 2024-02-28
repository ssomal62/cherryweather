import React, {useEffect} from 'react';
import {Card, CardBody, Spinner} from "@nextui-org/react";
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import {useNavigate} from "react-router-dom";
import UseClientIp from "../../recoil/hooks/UseClientIp";

//시간 포맷 함수
const formatTime = (time) => {
    if (!time) return '';
    const timeString = time.toString();
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2);
    return `${hours}:${minutes.padStart(2, '0')}`;
}
const TodayWeather = () => {

    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const {fetchData, data, loading, error} = UseFetchWeather(`/weather/daily?ip=${clientIp}`);
    const navigate = useNavigate();

    // 이동 함수
    const handleCardClick = () => {
        navigate('/weatherDetail');
    }

    useEffect(() => {
        if (clientIp) {
            fetchData();
        }
    }, [fetchData, clientIp]);

    //현재 낮인지 밤인지 판별
    const isDaytime = () => {
        if (!data) return true;
        const now = new Date();
        const sunrise = new Date(now.toDateString() + ' ' + data.sunrise);
        const sunset = new Date(now.toDateString() + ' ' + data.sunset);
        return now >= sunrise && now <= sunset;
    }

    //날씨와 시간에 따라 배경 이미지 변경
    const getBackgroundImage = () => {
        if (!data) return require('../../assets/images/weather/background/clear_day.jpg'); // data가 없는 경우 기본 이미지 반환

        const weather = data.weather;
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

    // backgroundImage 스타일 동적으로 설정
    const cardStyle = {
        backgroundImage: `url(${getBackgroundImage()})`
    };

    // 로딩 중일 경우
    if (loading) {
        return <div>
            <Card className = "py-4">
                <CardBody className = "overflow-visible py-2" style = {{height: '210px'}}>
                    <Spinner label = "Loading..." color = "danger" className = "mt-16"/>
                </CardBody>
            </Card>
        </div>; // 로딩 중 표시 문구 출력
    }
    // 데이터가 없는 경우
    if (error) {
        return <div>error : {error.message}</div>;
    }

    //데이터가 있는 경우
    if (data) {
        const sunrise = formatTime(data.sunrise);
        const sunset = formatTime(data.sunset);
        return (
            <div>
                <div className = "py-4 rounded-none" style = {cardStyle} onClick = {handleCardClick}>
                    <div className = "overflow-visible py-2 relative" style = {{height: '210px'}}>
                        <div className = "font-sans text-6xl font-bold text-white/90 text-shadow-small absolute" style = {{textShadow: '0 0 4px black'}}
                             onClick = {handleCardClick}>
                            {data.currentTemp}℃<br/>
                        </div>
                        <div className = "font-sans text-medium text-white/90 text-shadow-small absolute bottom-14 left-4" style = {{textShadow: '0 0 4px black'}}>
                            L : {data.minTemp}℃ / H : {data.maxTemp}℃
                        </div>
                        <div className = "font-sans text-xl text-white/90 text-shadow-small absolute bottom-7 left-4" style = {{textShadow: '0 0 4px black'}}>
                            <span className = "text-2xl">{data.area}</span>, <span className = "text-medium">{data.city}</span>
                        </div>
                        <div className = "font-sans text-xl text-white/90 text-shadow-small absolute bottom-7 right-3" style = {{textShadow: '0 0 4px black'}}>
                            {data.weather}
                        </div>
                    </div>
                    <div
                        className = "justify-between bg-white/50 border-white/20 border-1 overflow-hidden py-1 before:rounded-xl rounded-large bottom-1">
                        <img alt = "" src = {require('../../assets/images/weather/icon/sunrise.png')} style = {{width: '20px'}}/> : <small>{sunrise}</small>
                        <img alt = "" src = {require('../../assets/images/weather/icon/sunset.png')} style = {{width: '20px'}}/> : <small>{sunset}</small>
                        <img alt = "" src = {require('../../assets/images/weather/icon/wind.png')} style = {{width: '20px'}}/> : <small>{data.windSpeed}m/s</small>
                        <img alt = "" src = {require('../../assets/images/weather/icon/umbrellar.png')} style = {{width: '20px'}}/> : <small>{data.rainProbability}%
                                                                                                                                                                   / {data.rainfall}</small>
                    </div>
                </div>
            </div>
        );
    }
};

export default TodayWeather;