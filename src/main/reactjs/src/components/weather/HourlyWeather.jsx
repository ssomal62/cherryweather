import React, {useEffect} from 'react';
import {Chip, ScrollShadow, Spinner} from "@nextui-org/react";
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import ReactApexChart from 'react-apexcharts';


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
    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const {fetchData, data, loading, error} = UseFetchWeather(`/weather/hourly?ip=${clientIp}`);

    useEffect(() => {
        if (clientIp) {
            fetchData();
        }
    }, [fetchData, clientIp]);

    //차트 데이터 설정
    const chartData = {
        series : [{
            name: "기온",
            data: data ? data.map(hourlyData => {
                // 날짜와 시간을 ISO 8601 형식으로 변환
                const dateTimeStr = `${hourlyData.fcstDate.substring(0, 4)}-${hourlyData.fcstDate.substring(4, 6)}-${hourlyData.fcstDate.substring(6, 8)}T${hourlyData.fcstTime.substring(0, 2)}:${hourlyData.fcstTime.substring(2, 4)}:00`;
                // Date 객체 생성 및 Unix Timestamp 변환
                const timestamp = new Date(dateTimeStr).getTime();
                // Timestamp와 온도(tmp)를 배열로 반환
                return [timestamp, parseFloat(hourlyData.tmp)];
            }) : []
        }],
        options: {
            chart      : {
                type   : 'area',
                height : 350,
                toolbar: {
                    offsetX: -20,    //차트의 왼쪽 여백
                },
                zoom   : {
                    enabled: false
                }
            },
            colors     : ['#00FF00'],
            plotOptions: {
                bar: {
                    horizontal: false,
                }
            },
            dataLabels : {
                enabled: false
            },
            stroke     : {
                curve: 'smooth'
            },
            xaxis      : {
                type: 'datetime',
            },
            tooltip    : {
                x: {
                    format: 'HH:mm'
                },
            },
        }
    };

    if (loading) {
        return (
            <div>
                <Spinner label = "Loading..."/>
            </div>
        )
    }

    if (error) {
        return (
            <div>Error: {error.message}</div>
        )
    }
    if (data) {
        return (
            <div>
                <ScrollShadow hideScrollBar offset = {0} orientation = "horizontal" className = "max-w-[600px] max-h-[110px]">
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
                <div style = {{width: '100%', overflowX: 'auto', overflowY: 'hidden'}}>
                    <ReactApexChart options = {chartData.options} series = {chartData.series} type = "area" height = {300} width = {1200}/>
                </div>
            </div>
        )
    }
};

export default HourlyWeather;