import React, {useEffect} from 'react';
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import {Spinner} from "@nextui-org/react";
import UseClientIp from "../../recoil/hooks/UseClientIp";

const TodayDetail = () => {
    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const {fetchData, data, loading, error} = UseFetchWeather(`/weather/weekly?ip=${clientIp}`);

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
        return (
            <div>

                {data && data.map((weeklyData, index) => (
                    <div key = {index} style={{border:'1px solid green'}}>
                        예보 날짜 : {weeklyData.fcstDate}<br/>
                        예보 시간 : {weeklyData.fcstTime}<br/>
                        날씨 : {weeklyData.weather}<br/>
                        강수 확율 : {weeklyData.pop}<br/>
                        최저 온도 : {weeklyData.tmn}<br/>
                        최고 온도 : {weeklyData.tmx}
                    </div>
                ))}
            </div>
        )
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
