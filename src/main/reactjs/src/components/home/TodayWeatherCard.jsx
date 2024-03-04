import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {IoMdAddCircleOutline} from "react-icons/io";
import {TbJacket} from "react-icons/tb";
import {useNavigate} from "react-router-dom";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import {dailyWeatherState, UseWeatherData, weeklyWeatherState} from "../../recoil/hooks/UseWeatherData";
import {useRecoilValue} from "recoil";
import FloatingAnimation from "../../utils/animations/FloatingAnimation";
import {motion} from "framer-motion";
import {Swiper, SwiperSlide} from "swiper/react";
import {Button, Spinner, Tab, Tabs} from "@nextui-org/react";
import {FaHashtag} from "react-icons/fa6";

const TodayWeatherCard = () => {

        const clientIp = UseClientIp(); //ip를 백엔드로 전송
        const DailyFetchData = UseWeatherData({endpoint: `/weather/daily?ip=${clientIp}`, state: dailyWeatherState});
        const WeeklyFetchData = UseWeatherData({endpoint: `/weather/weekly?ip=${clientIp}`, state: weeklyWeatherState});
        const {data: dailyData, loading: dailyLoading, error: dailyError} = useRecoilValue((dailyWeatherState))
        const {data: weeklyData, loading: weeklyLoading, error: weeklyError} = useRecoilValue((weeklyWeatherState))
        // const navigate = useNavigate();

        useEffect(() => {
            if (clientIp) {
                DailyFetchData();
                WeeklyFetchData()
            }
        }, [DailyFetchData, WeeklyFetchData, clientIp]);


        const navigate = useNavigate();

        const menu = [
            {
                key       : "event",
                label     : "날씨상세",
                icon      : <IoMdAddCircleOutline/>,
                navigateTo: "/weatherDetail",
            },
            {
                key       : "event",
                label     : "오늘모임",
                icon      : <IoMdAddCircleOutline/>,
                navigateTo: "/community/event",
            },
            {
                key       : "ai",
                label     : "AI코디",
                icon      : <TbJacket/>,
                navigateTo: "/imageList",
            }
        ];

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


        return (
            <Section>
                {dailyLoading && (
                    <Spinner className = "h-[100%] w-[100%]" label = "체리가 기상청 터는중..." color = "primary" size = "lg"/>
                )}
                {dailyError && (
                    <div className = "h-[100%] w-[100%]" label = "체리가 기상청 털다가 잡혀감" color = "primary" size = "lg"/>
                )}
                {dailyData && (
                    <Container>
                        <Area>{dailyData.area} / {dailyData.city}</Area>
                        <CurrentDate>{formattedDate}</CurrentDate>
                        <Temp>
                            <Temperature>{dailyData.currentTemp}</Temperature><Celsius>℃</Celsius>
                        </Temp>
                        <Weather>{dailyData.weather}</Weather>
                        <Icon>
                            <FloatingAnimation>
                                {/*<MotionImg src = "https://kr.object.ncloudstorage.com/cherry-weather/weather/main/icon/snowy.png" alt = "weather"/>*/}
                                <MotionImg src = {`https://kr.object.ncloudstorage.com/cherry-weather/weather/main/icon/${getWeatherIconWithTime(dailyData.weather, dailyData.sunrise, dailyData.sunset)}.png`} alt = "weather"/>
                            </FloatingAnimation>
                        </Icon>
                        <Menu>
                            <Swiper
                                spaceBetween = {5}
                                slidesPerView = {'auto'}
                                // slidesOffsetBefore={50}
                            >
                                {menu.map((item, index) => (
                                    <SwiperSlide key = {index} className = "max-w-[5.3em] mr-2 ml-2">
                                        <Button
                                            size = "sm"
                                            radius = "full"
                                            variant = "light"
                                            style = {{border: '1px solid #424242'}}
                                            className = "bg-white/60"
                                            onPress = {() => handleClick(item)}>
                                            <div className = "flex flex-row items-center">
                                                <FaHashtag/>&nbsp;{item.label}
                                            </div>
                                        </Button>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Menu>
                        <Bottom>
                            <Tabs
                                aria-label = "Options"
                                selectedKey = {selected}
                                onSelectionChange = {setSelected}
                                variant = "underlined"
                                color = "primary"
                                fullWidth
                            >
                                <Tab key = "24Hour" title = "24Hour" className = "py-0">
                                    <ForecastPanel>24Hour</ForecastPanel>
                                </Tab>
                                <Tab key = "Weekly" title = "Weekly" className = "py-0">
                                    <ForecastPanel>
                                        {weeklyData && weeklyData.map((data, index) => (
                                            <ForecastList key = {index}>
                                                <ForecastDate>{formatDate(data.fcstDate)}</ForecastDate>
                                                <ForecastWeather>
                                                    <img src = {`https://kr.object.ncloudstorage.com/cherry-weather/weather/icon/${getWeatherIconName(data.weather)}.svg`}
                                                         alt = {data.weather}/>
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
            </Section>
        );
    }
;

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
    font-family: Exo;
    font-weight: 700;
    font-size: 1.2em;
    color: #366296;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
`;

const CurrentDate = styled.div`
    font-family: Exo;
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
    font-family: Exo;
    font-weight: 900;
    font-size: 7em;
    color: #366296;
`;

const Celsius = styled.span`
    font-family: Exo;
    font-weight: 600;
    font-size: 2.5em;
    color: #366296;
    position: relative;
    margin-top: -1.4em;
    margin-left: 0.2em;
`;

const Weather = styled.div`
    font-family: Exo;
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
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 70vw;
    height: 70vw;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MotionImg = motion.img;

const Menu = styled.div`
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
`;

const Bottom = styled.div`
    background-image: url('https://kr.object.ncloudstorage.com/cherry-weather/weather/main/box.png');
    background-size: cover;
    max-width: 600px;
    position: absolute;
    top: 72%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 100%;
    height: 28%;
    padding: 2% 4% 0 4%;
`;

const ForecastPanel = styled.div`
    min-width: 100%;
    height: 15vh;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
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
    height: 90%;
    min-width: 17%;
    position: relative;
`;
const ForecastDate = styled.div`
    position: absolute;
    font-family: Exo;
    font-size: 0.8em;
    color: #63666b;
    font-weight: bold;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
`;
const ForecastWeather = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 120%;
`;

const ForecastTemp = styled.div`
    position: absolute;
    bottom: 7%;
    left: 50%;
    transform: translateX(-50%);
`;
const ForecastMinTemp = styled.span`
    font-family: Exo;
    font-size: 0.8em;
    font-weight: bold;
    color: blue;
`;
const ForecastMaxTemp = styled.span`
    font-family: Exo;
    font-size: 0.8em;
    font-weight: bold;
    color: red;
`;