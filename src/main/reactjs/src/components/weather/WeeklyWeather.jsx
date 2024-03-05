import React, {useEffect} from 'react';
import {UseWeatherData, weeklyWeatherState} from "../../recoil/hooks/UseWeatherData";
import {Card, CardBody, CardHeader, Spinner} from "@nextui-org/react";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import styled from "styled-components";
import {useRecoilValue} from "recoil";

const TodayDetail = () => {
    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const fetchData = UseWeatherData({endpoint: `/weather/weekly?ip=${clientIp}`, state: weeklyWeatherState});
    const {data, loading, error} = useRecoilValue((weeklyWeatherState))

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

    useEffect(() => {
        if (clientIp) {
            fetchData();
        }
        console.log("week : ", data); // 출력 확인용
    }, [fetchData, clientIp]);

    return (
        <Container>
            <Card isBlurred>
                {loading && (
                    <Spinner className = "h-[300px]" label = "Loading..."/>
                )}
                {error && (
                    <div className = "h-[300px]">Error: {error.message}</div>
                )}
                {data && (
                    <div>
                        <CardHeader>
                            <p style = {{color: 'darkgray', fontSize: '0.6em'}}>주간 날씨</p>
                        </CardHeader>
                        <CardBody>
                            {data && data.map((weeklyData, index) => (
                                <Weekly key = {index}>
                                    <Date>
                                        {formatDate(weeklyData.fcstDate)}<br/>
                                    </Date>
                                    <WeatherIcon>
                                        <img src = {`https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/${getWeatherIconName(weeklyData.weather)}.svg`}
                                             alt = {weeklyData.weather} style={{minWidth:'150%'}}/>
                                    </WeatherIcon>
                                    <Weather>
                                        {weeklyData.weather}<br/>
                                    </Weather>
                                    <RainIcon>
                                        <img src = {`https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/rain.png`}
                                             alt = {data.weather}/>
                                    </RainIcon>
                                    <RainPro>
                                        {weeklyData.pop}%<br/>
                                    </RainPro>
                                    <Temperature>
                                    <span style = {{color:'hotpink'}}>{formatTemperature(weeklyData.tmx)}℃ </span> / <span style = {{color: 'dodgerblue'}}> {formatTemperature(weeklyData.tmn)}℃</span>
                                    </Temperature>
                                </Weekly>
                            ))}
                        </CardBody>
                    </div>
                )}
            </Card>
        </Container>
    )
};
export default TodayDetail;

/* 날짜 형식 포멧 */
const formatDate = (dateString) => {
    if (!dateString) return '';
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${parseInt(month, 10)}/${parseInt(day, 10)}`;
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 8%;
`;

const Weekly = styled(Card)`
    //border: 1px solid lightgrey;
    //box-shadow: 1px 1px 1px lightgrey;
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    border-radius: 20px;
    margin-bottom: 10px;
`;

const Date = styled.div`
    position: absolute;
    height: 100%;
    width: 20%;
    left: 0;
    display: flex;
    align-items: center;
    padding-left: 8%;
    font-size: 0.8em;
    font-weight: bold;
`;
const WeatherIcon = styled.div`
    position: absolute;
    height: 100%;
    width: 12%;
    left: 23%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Weather = styled.div`
    position: absolute;
    height: 100%;
    width: 20%;
    left: 35%;
    display: flex;
    align-items: center;
    font-size: 0.8em;
`;
const RainIcon  = styled.div`
    position: absolute;
    height: 100%;
    width:10%;
    left: 55%;
    display: flex;
    align-items: center;
    justify-content: right;
    padding: 3%;
    
    `;
const RainPro = styled.div`
    position: absolute;
    height: 100%;
    width: 7%;
    left: 65%;
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 0.8em;
`;

const Temperature = styled.div`
    position: absolute;
    height: 100%;
    width: 28%;
    right:0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
`;