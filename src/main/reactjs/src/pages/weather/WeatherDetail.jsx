import React from 'react';
import Layout from "../../common/Layout";
import HourlyWeather from "../../components/weather/HourlyWeather";
import TodayWeather from "../../components/weather/TodayWeather";
import SatelliteImageViewer from "../../components/weather/SatelliteImageViewer";
import TodayDetail from "../../components/weather/TodayDetail";
import AirQuality from "../../components/weather/AirQuality";
import WeeklyWeather from "../../components/weather/WeeklyWeather";
import styled from "styled-components";

const WeatherDetail = () => {
    return (
        <Layout containerMargin = "0 0 0 0" containerPadding = "0 0 0 0">
            <Container>
                <Background/>
                <div className = "mb-6">
                    <TodayWeather/>
                    <HourlyWeather/>
                    <TodayDetail/>
                    <SatelliteImageViewer/>
                    <WeeklyWeather/>
                    <AirQuality/>
                </div>
            </Container>
        </Layout>
    );
};

export default WeatherDetail;

const Container = styled.div`
    position: relative;
`;
const Background = styled.div`
    background-image: url('https://kr.object.ncloudstorage.com/cherry-weather/weather/main/bg.png');
    background-size: cover;
    max-width: 600px;
    width: 100%;
    height: 740px;
    background-repeat: no-repeat;
    background-attachment: fixed;
    position: fixed;
    z-index: -1;
`;