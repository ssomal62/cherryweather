import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {IoMdAddCircleOutline} from "react-icons/io";
import {TbJacket} from "react-icons/tb";
import {useNavigate} from "react-router-dom";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import {dailyWeatherState, hourlyWeatherState, UseWeatherData, weeklyWeatherState} from "../../recoil/hooks/UseWeatherData";
import {useRecoilValue} from "recoil";
import LoadingCard from "./LoadingCard";
import FloatingAnimation from "../../utils/animations/FloatingAnimation";
import {motion} from "framer-motion";
import {Tab, Tabs} from "@nextui-org/react";
import Clear from "../../assets/weatherIcon/clear.jsx";
import Cloudy from "../../assets/weatherIcon/cloudy.jsx";
import Rainy from "../../assets/weatherIcon/rainy.jsx";
import Snowy from "../../assets/weatherIcon/snowy.jsx";
import Shower from "../../assets/weatherIcon/shower.jsx";
import RainySnowy from "../../assets/weatherIcon/rainy-snowy.jsx";


const TodayWeatherCard = () => {

    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const DailyFetchData = UseWeatherData({endpoint: `/weather/daily?ip=${clientIp}`, state: dailyWeatherState});
    const HourlyFetchData = UseWeatherData({endpoint: `/weather/hourly?ip=${clientIp}`, state: hourlyWeatherState});
    const WeeklyFetchData = UseWeatherData({endpoint: `/weather/weekly?ip=${clientIp}`, state: weeklyWeatherState});
    const {data: dailyData, loading: dailyLoading, error: dailyError} = useRecoilValue((dailyWeatherState))
    const {data: hourlyData, loading: hourlyLoading, error: hourlyError} = useRecoilValue((hourlyWeatherState))
    const {data: weeklyData, loading: weeklyLoading, error: weeklyError} = useRecoilValue((weeklyWeatherState))
    // const navigate = useNavigate();

    const [forcedLoading, setForcedLoading] = useState(true);
    const [number, setNumber] = useState('')

    useEffect(() => {
        if (clientIp) {
            DailyFetchData();
            HourlyFetchData();
            WeeklyFetchData();
        }
    }, [DailyFetchData, HourlyFetchData, WeeklyFetchData, clientIp]);


    const navigate = useNavigate();

    const handleClick = (item) => {
        navigate(item.navigateTo);
    };

    let formattedDate = '';
    if (dailyData) {
        const year = dailyData.fcstDate.substring(0, 4);
        const month = dailyData.fcstDate.substring(4, 6) - 1;
        const day = dailyData.fcstDate.substring(6, 8);
        const date = new Date(year, month, day);

        formattedDate = date.toLocaleDateString('en-US', {
            day    : '2-digit',
            month  : 'short',
            year   : 'numeric',
            weekday: 'short'
        });
    }

    const [selected, setSelected] = useState("photos");

    function formatDate(yyyyMMdd) {
        const year = yyyyMMdd.substring(0, 4);
        const month = yyyyMMdd.substring(4, 6);
        const day = yyyyMMdd.substring(6, 8);
        return `${parseInt(month, 10)}/${parseInt(day, 10)}`; // 월과 일 앞의 '0'을 제거하기 위해 parseInt 사용
    }

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

    function getWeatherIconWithTime(weather, sunrise, sunset) {

        const now = new Date();
        const currentTime = now.getHours() * 100 + now.getMinutes();

        const sunriseTime = parseInt(sunrise, 10);
        const sunsetTime = parseInt(sunset, 10);

        // 현재 시간이 일출과 일몰 사이인지 확인
        let timeSuffix = "";
        if (currentTime >= sunriseTime && currentTime <= sunsetTime) {
            timeSuffix = "-day";
        } else {
            timeSuffix = "-night";
        }

        let iconName = getWeatherIconName(weather);

        // 특정 날씨 조건에 대해 시간 접미사 추가하지 않음
        if (["rainy-snowy", "shower", "snowy"].includes(iconName)) {
            timeSuffix = "";
        }

        return iconName + timeSuffix;
    }

    const WeatherIcons = {
        clear     : Clear,
        cloudy    : Cloudy,
        rainy     : Rainy,
        snowy     : Snowy,
        shower    : Shower,
        rainySnowy: RainySnowy,
    }

    function WeatherIcon({weather}) {
        const iconName = getWeatherIconName(weather); // 날씨 상태에 따른 아이콘 이름을 가져옵니다.
        const IconComponent = WeatherIcons[iconName]; // 매핑 객체에서 해당 컴포넌트를 찾습니다.

        // 해당 컴포넌트가 있으면 렌더링하고, 없으면 null을 반환합니다.
        return IconComponent ? <IconComponent/> : null;
    }

    const navWeatherDetail = () => {
        navigate('/weatherDetail'); // '/weatherDetail'로 네비게이션
    };

    return (
        <Section>
            {(forcedLoading || dailyLoading) && (
                <div className = "py-[55%] items-center justify-center">
                    <LoadingCard number = {number} setNumber = {setNumber}/>
                </div>
            )}
            {(dailyData && !forcedLoading) && (
                <Container>
                    <Area>{dailyData.area} / {dailyData.city}</Area>
                    <CurrentDate>{formattedDate}</CurrentDate>
                    <Temp>
                        <Temperature>{dailyData.currentTemp}</Temperature><Celsius>℃</Celsius>
                    </Temp>
                    <Weather>{dailyData.weather}{Clear}</Weather>
                    <Icon>
                        <FloatingAnimation>
                            <MotionImg
                                src = {`https://kr.object.ncloudstorage.com/cherry-weather/weather/main/icon/${getWeatherIconWithTime(dailyData.weather, dailyData.sunrise, dailyData.sunset)}.png`}
                                alt = "weather" onClick = {navWeatherDetail}/>
                        </FloatingAnimation>
                    </Icon>
                    <Bottom>
                        <Tabs
                            aria-label = "Options"
                            selectedKey = {selected}
                            onSelectionChange = {setSelected}
                            variant = "underlined"
                            color = "primary"
                            fullWidth
                        >
                            <Tab key = "24Hour" title = "오늘">
                                <ForecastPanel>
                                    {hourlyData && hourlyData.map((data, index) => (
                                        <ForecastList key = {index}>
                                            <ForecastDate>{data.fcstTime.substring(0, 2)}시</ForecastDate>
                                            <ForecastWeather>
                                                <WeatherIcon weather = {data.weather} style = {{width: "100%"}}/>
                                            </ForecastWeather>
                                            <ForecastTemp>
                                                <CurrentTemp>{formatTemperature(data.tmp)}℃</CurrentTemp>
                                            </ForecastTemp>
                                        </ForecastList>
                                    ))}
                                </ForecastPanel> </Tab>
                            <Tab key = "Weekly" title = "주간">
                                <ForecastPanel>
                                    {weeklyData && weeklyData.map((data, index) => (
                                        <ForecastList key = {index}>
                                            <ForecastDate>{formatDate(data.fcstDate)}</ForecastDate>
                                            <ForecastWeather>
                                                <WeatherIcon weather = {data.weather} style = {{width: "100%"}}/>
                                            </ForecastWeather>
                                            <ForecastTemp>
                                                <ForecastMinTemp>{formatTemperature(data.tmn)}</ForecastMinTemp>
                                                <span style = {{color: '#366296'}}>/</span>
                                                <ForecastMaxTemp>{formatTemperature(data.tmx)}</ForecastMaxTemp>
                                            </ForecastTemp>
                                        </ForecastList>
                                    ))}
                                </ForecastPanel>
                            </Tab>
                        </Tabs>
                    </Bottom>
                </Container>
            )}
            {dailyError && (
                <div className = "h-[100%] w-[100%]" label = "체리가 기상청 털다가 잡혀감" color = "primary" size = "lg"/>
            )}
        </Section>
    );
};

export default TodayWeatherCard;

const Section = styled.div`
    background-image: url('https://kr.object.ncloudstorage.com/cherry-weather/weather/main/bg.png');
    background-size: cover;
    max-width: 600px;
    width: 100%;
    height: 740px;
`;
const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
`;
const Area = styled.div`
    font-weight: 700;
    font-size: 1.2em;
    color: #366296;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
`;
const CurrentDate = styled.div`
    font-weight: 300;
    font-size: 1em;
    color: #63666b;
    position: absolute;
    top: 20.5%;
    left: 50%;
    transform: translateX(-50%);
`;
const Temp = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 21%;
    left: 55%;
    transform: translateX(-50%);
    z-index: 10;
`;
const Temperature = styled.span`
    font-size: 7em;
    font-family: 'Days One', sans-serif;
    background: -webkit-linear-gradient(#0963c8, #3a54c3);
    background: linear-gradient(#0963c8, #3a54c3);
    -webkit-background-clip: text;
    color: transparent;
`;
const Celsius = styled.span`
    font-weight: 600;
    font-size: 2.5em;
    position: relative;
    margin-top: -1.4em;
    margin-left: 0.2em;
    font-family: 'Days One', sans-serif;
    background: -webkit-linear-gradient(#0963c8, #3a54c3);
    background: linear-gradient(#0963c8, #3a54c3);
    -webkit-background-clip: text;
    color: transparent;
`;
const Weather = styled.div`
    font-weight: bold;
    font-size: 1em;
    color: #63666b;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
`;
const Icon = styled.div`
    position: absolute;
    top: 26%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 70%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const MotionImg = motion.img;
const Bottom = styled.div`
    background-color: white;
    border-radius: 50px 50px 0 0;
    max-width: 600px;
    position: absolute;
    //top: 60%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 100%;
    height: 36%;
    padding: 2% 4% 0 4%;
`;
const ForecastPanel = styled.div`
    min-width: 100%;
    min-height: 140px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    -ms-overflow-style: none; /* IE와 Edge에서 스크롤 바를 숨김 */
    scrollbar-width: none; /* Firefox에서 스크롤 바를 숨김 */

    &::-webkit-scrollbar {
        display: none; /* 웹킷(크롬, 사파리, 오페라) 기반 브라우저에서 스크롤바 숨김 */
    }
`;
const ForecastList = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #c1e1ff;
    border-radius: 50px;
    margin: 2%;
    min-height: 90%;
    min-width: 63px;
    position: relative;
`;
const ForecastDate = styled.div`
    position: absolute;
    font-size: 0.8em;
    color: #366296;
    top: 13%;
    left: 50%;
    transform: translateX(-50%);
`;
const ForecastWeather = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 105%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
`;
const ForecastTemp = styled.div`
    position: absolute;
    bottom: 13%;
    left: 50%;
    transform: translateX(-50%);
`;
const ForecastMinTemp = styled.span`
    font-size: 0.8em;
    color: dodgerblue;
`;
const ForecastMaxTemp = styled.span`
    font-size: 0.8em;
    color: hotpink;
`;
const CurrentTemp = styled.span`
    font-size: 0.8em;
    color: #366296;
`;