import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import FloatingAnimation from "../../utils/animations/FloatingAnimation";
import Cloudy from "../../assets/theme/default/Cloudy";
import {Button} from "@nextui-org/react";
import {Swiper, SwiperSlide} from "swiper/react";
import {IoMdAddCircleOutline} from "react-icons/io";
import {TbJacket} from "react-icons/tb";
import {useNavigate} from "react-router-dom";
import {FaHashtag} from "react-icons/fa6";
import UseClientIp from "../../recoil/hooks/UseClientIp";
import {dailyWeatherState, UseWeatherData} from "../../recoil/hooks/UseWeatherData";
import {useRecoilValue} from "recoil";
import LoadingCard from "./LoadingCard";
import FadeInAnimation from "../../utils/animations/FadeInAnimation";

const TodayWeatherCard = () => {

    const clientIp = UseClientIp(); //ip를 백엔드로 전송
    const fetchData = UseWeatherData({endpoint: `/weather/daily?ip=${clientIp}`, state: dailyWeatherState});
    const {data, loading, error} = useRecoilValue((dailyWeatherState))
    // const navigate = useNavigate();
    const [forcedLoading, setForcedLoading] = useState(true);
    const [number, setNumber] = useState('')

    useEffect(() => {
        if (clientIp) {
            fetchData();
        }

        const timer = setTimeout(() => {
            setForcedLoading(false);
        }, 1000);
        // 컴포넌트가 언마운트 될 때 타이머를 정리
        return () => clearTimeout(timer);

    }, [fetchData, clientIp]);

    const navigate = useNavigate();

    const menu = [
        {
            key       : "event",
            label     : "날씨상세",
            icon      : <IoMdAddCircleOutline style={styles.icon}/>,
            navigateTo: "/weatherDetail",
        },
        {
            key       : "event",
            label     : "오늘모임",
            icon      : <IoMdAddCircleOutline style={styles.icon}/>,
            navigateTo: "/community/event",
        },
        {
            key       : "ai",
            label     : "AI코디",
            icon      : <TbJacket style={styles.icon}/>,
            navigateTo: "/imageList",
        }
    ];

    const handleClick = (item) => {
        navigate(item.navigateTo);
    };

    return (
        <Section>
            {(forcedLoading || loading) && (
                <div className="py-[55%] items-center justify-center">
                    <LoadingCard number={number} setNumber={setNumber}/>
                </div>
            )}
            {(data && !forcedLoading) && (
                <FadeInAnimation>
                    <div className="flex pt-[40%] flex-col items-center justify-center ">
                        <div className="gap-y-1">
                            <FloatingAnimation>
                                <Cloudy fill="#424242" stroke="#424242"/>
                            </FloatingAnimation>
                        </div>
                        <div className="flex-row flex items-start">
                            <p style={styles.temperature}>{data.currentTemp}℃</p>
                        </div>
                        <div className="flex-row flex items-start">
                            <Button style={{backgroundColor: "#424242"}} radius="full">
                                <p style={styles.area}>{data.area} / {data.weather}</p>
                            </Button>
                        </div>

                        <div className="mt-16 max-w-full justify-center items-center">
                            <Swiper
                                spaceBetween={5}
                                slidesPerView={'auto'}
                                // slidesOffsetBefore={50}
                            >
                                {menu.map((item, index) => (
                                    <SwiperSlide key={index} className="max-w-[5.3em] mr-2 ml-2">
                                        <Button
                                            size="sm"
                                            radius="full"
                                            variant="light"
                                            style={{border: '1px solid #424242'}}
                                            onPress={() => handleClick(item)}>
                                            <div className="flex flex-row items-center">
                                                <FaHashtag/>&nbsp;{item.label}
                                            </div>
                                        </Button>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </FadeInAnimation>
            )}
        </Section>
    );
};

export default TodayWeatherCard;

const Section = styled.div`
  background-image: linear-gradient(to bottom, #ffffff, #C9D2ED, #ffffff, #ffffff);
  max-width: 600px;
  width: 100%;
  height: 900px;
`

const styles = {
    temperature: {
        fontFamily: 'Exo',
        fontWeight: 300,
        fontSize  : '5em',
        color     : '#424242',
    },
    area       : {
        fontFamily: 'Exo',
        fontWeight: 200,
        fontSize  : '1.2em',
        color     : 'white',
    }
}
