import React, {useEffect} from 'react';
import {Chip, ScrollShadow, Spinner} from "@nextui-org/react";
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";

//시간 포맷 함수
const formatTime = (time) => {
    if (!time) return '';
    const timeString = time.toString();
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2);
    return `${hours}:${minutes.padStart(2, '0')}`;
}

//날짜 포맷 함수
const formatDate = (date) => {
    if (!date) return '';
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return `${month}/${day}`;
}

const HourlyWeather = () => {
    const {fetchData, data, loading, error} = UseFetchWeather('/weather/hourly');

    useEffect(() => {
        const loadData = async () => {
            await fetchData();
        }
        loadData();

    }, [fetchData])

    return (
        <div>
            {loading && (
                <div>
                    <Spinner label = "Loading..."/>
                </div>
            )}
            {error && <div>Error: {error.message}</div>}
            <ScrollShadow hideScrollBar offset={0} orientation = "horizontal" className = "max-w-[600px] max-h-[110px]">
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    {data && data.map((hourlyData, index) => (
                        <Chip key = {index} className = "py-4 mt-1 ml-1" variant = "shadow" color = "danger" style = {{width: '1800ps', height: '100px'}}>
                            <div>{formatDate(hourlyData.fcstDate)}</div>
                            <div>{formatTime(hourlyData.fcstTime)}</div>
                            <div>{hourlyData.weather}</div>
                            <div>{hourlyData.tmp}℃</div>
                        </Chip>
                    ))}
                </div>
            </ScrollShadow>
        </div>
    );
};

export default HourlyWeather;