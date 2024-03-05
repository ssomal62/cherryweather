import React, {useEffect} from 'react';
import {Card, CardHeader, Divider, Spinner} from "@nextui-org/react";
import {hourlyWeatherState, UseWeatherData} from "../../recoil/hooks/UseWeatherData";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import {useRecoilValue} from "recoil";

const HourlyWeather = () => {
    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const fetchData = UseWeatherData({endpoint:`/weather/hourly?ip=${clientIp}`, state: hourlyWeatherState});
    const {data, loading, error} = useRecoilValue((hourlyWeatherState))

    useEffect(() => {
        if (clientIp) {
            fetchData();
        }
    }, [fetchData, clientIp]);

    //차트 데이터 설정
    const chartData = {
        series: [{
            name: "기온",
            data: data && Array.isArray(data) ? data.map(hourlyData => {
                // 여기서 hourlyData 객체와 필요한 속성이 있는지 확인
                if (hourlyData && hourlyData.fcstDate && hourlyData.fcstTime) {
                    const dateTimeStr = `${hourlyData.fcstDate.substring(0, 4)}-${hourlyData.fcstDate.substring(4, 6)}-${hourlyData.fcstDate.substring(6, 8)}T${hourlyData.fcstTime.substring(0, 2)}:${hourlyData.fcstTime.substring(2, 4)}:00Z`;
                    const timestamp = new Date(dateTimeStr).getTime();
                    return [timestamp, parseFloat(hourlyData.tmp)];
                }
                return [0, 0]; // 혹은 적절한 기본값 반환
            }).filter(item => item[0] !== 0) : [] // 필터를 추가하여 유효하지 않은 데이터 제거
        }],
        options: {
            chart      : {
                type   : 'area',
                height : 300,
                toolbar: {
                    offsetX: -20,    //차트의 왼쪽 여백
                    show:false
                },
                zoom   : {
                    enabled: false
                }
            },
            colors     : ['#F31260'],
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
                type         : 'datetime',
                tickPlacement: 'on',
                labels       : {
                    formatter: function (value) {
                        const date = new Date(value);
                        const hours = date.getUTCHours(); // UTC 시간을 사용
                        // 정시에 해당하는 눈금만 표시
                        return hours + '시';
                    },
                    style    : {
                        fontSize: '9px',
                    }
                },
            },
            yaxis      : {
                min   : function (min) {
                    return min - 2;
                },
                max   : function (max) {
                    return max + 2;
                },
                labels: {
                    style: {
                        fontSize: '9px',
                    }
                },
            },
            tooltip    : {
                x: {
                    formatter: function (value, {series, seriesIndex, dataPointIndex, w}) {
                        const date = new Date(value);
                        const hours = date.getUTCHours(); // UTC 시간을 사용
                        // 툴팁에는 정시만 표시
                        return `${hours}시`;
                    }
                },
            },
        }
    };

    return (
        <Container>
            <Card isBlurred className = "shadow-small h-[100%]">
                {loading && (
                    <Spinner className = "h-[300px]" label = "Loading..."/>
                )}
                {error && (
                    <div className = "h-[300px]">Error: {error.message}</div>
                )}
                {data && (
                    <div>
                        <CardHeader>
                                <p style={{color:'darkgrey', fontSize:'0.6em'}}>시간별 날씨</p>
                        </CardHeader>
                        <ReactApexChart options = {chartData.options} series = {chartData.series} type = "area" height = {200}/>
                    </div>
                )}
            </Card>
        </Container>
    )
};

export default HourlyWeather;

const Container = styled.div`
    height: 240px;
    padding: 0 8%;
`;