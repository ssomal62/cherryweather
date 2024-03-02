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
                {/*<DetailBackground/>*/}
                <div className="mb-6">
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

const DetailBackground = styled.div`
    max-width: 600px;
    width: 100%;
    height: 100%;
    background-image: url('https://kr.object.ncloudstorage.com/cherry-weather/weather/sunny-day.png');
    background-attachment: fixed;
    background-size: cover;
    position: absolute;
`;