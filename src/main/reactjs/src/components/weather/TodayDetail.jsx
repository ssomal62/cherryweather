import React, {useEffect} from 'react';
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import {Spinner} from "@nextui-org/react";
import UseClientIp from "../../recoil/hooks/UseClientIp";

const TodayDetail = () => {
    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const {fetchData, data, loading, error} = UseFetchWeather(`/weather/daily?ip=${clientIp}`);

    useEffect(() => {
        if (clientIp) {
            fetchData();
        }
    }, [fetchData, clientIp]);

    if (loading) {
        return <Spinner label = "Loading..." color = "danger" className = "mt-16"/>
    }
    if (error) {
        return <div>error : {error.message}</div>
    }
    if (data) {
        const sunrise = formatTime(data.sunrise)
        const sunset = formatTime(data.sunset)
        const moonrise = formatTime(data.moonrise)
        const moonset = formatTime(data.moonset)
        return (
            <div>
                <div style = {{width: '200px', height: '200px', border: '1px solid black'}}>
                    일출 : {sunrise}<br/>
                    일몰 : {sunset}<br/>
                    월출 : {moonrise}<br/>
                    월몰 : {moonset}<br/>
                </div>
                <div style = {{width: '200px', height: '200px', border: '1px solid black'}}>
                    습도 : {data.humidity}%
                </div>
                <div style = {{width: '200px', height: '200px', border: '1px solid black'}}>
                    강수 확률 : {data.rainProbability}%<br/>
                    강수량 : {data.rainfall}
                </div>
                <div style = {{width: '200px', height: '200px', border: '1px solid black'}}>
                    풍향 : {data.windDirection}<br/>
                    풍속 : {data.windSpeed}m/s
                </div>
            </div>

        );
    }
};
export default TodayDetail;

const formatTime = (time) => {
    if (!time) return '';
    const timeString = time.toString();
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2);
    return `${hours}:${minutes.padStart(2, '0')}`;
}
