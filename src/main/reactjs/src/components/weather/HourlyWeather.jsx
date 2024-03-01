import React, {useEffect} from 'react';
import {Card, CardHeader, Divider, Spinner} from "@nextui-org/react";
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

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
                const dateTimeStr = `${hourlyData.fcstDate.substring(0, 4)}-${hourlyData.fcstDate.substring(4, 6)}-${hourlyData.fcstDate.substring(6, 8)}T${hourlyData.fcstTime.substring(0, 2)}:${hourlyData.fcstTime.substring(2, 4)}:00Z`; // Z를 추가하여 UTC 시간임을 명시
                // Date 객체 생성 및 Unix Timestamp 변환
                const timestamp = new Date(dateTimeStr).getTime();
                // Timestamp와 온도(tmp)를 배열로 반환
                return [timestamp, parseFloat(hourlyData.tmp)];
            }) : []
        }],
        options: {
            chart      : {
                type   : 'area',
                height : 300,
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
                        fontSize: '12px',
                        colors  : '#fff'
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
                        fontSize: '12px',
                        colors  : '#fff'
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
            <Card isBlurred className = "bg-black/30 rounded-xl rounded-large shadow-small h-[100%]">
                {loading && (
                    <Spinner className = "h-[300px]" label = "Loading..."/>
                )}
                {error && (
                    <div className = "h-[300px]">Error: {error.message}</div>
                )}
                {data && (
                    <div>
                        <CardHeader>
                            <div className = "flex flex-col">
                                <p className = "text-sm text-white">시간대 날씨</p>
                            </div>
                        </CardHeader>
                        <Divider className="bg-white/50 mb-5"/>
                        <ReactApexChart options = {chartData.options} series = {chartData.series} type = "area" height = {220}/>
                    </div>
                )}
            </Card>
        </Container>
    )
};

export default HourlyWeather;

const Container = styled.div`
    height: 344px;
    padding: 22px;
`;