import React from 'react';
import Layout from "../../common/Layout";
import HourlyWeather from "../../components/weather/HourlyWeather";
import TodayWeather from "../../components/weather/TodayWeather";
import SunMoonInfo from "../../components/weather/SunMoonInfo";
import SatelliteImageViewer from "../../components/weather/SatelliteImageViewer";

const WeatherDetail = () => {
    return (
        <Layout>
            오늘 날씨
            <TodayWeather/>
            시간별 날씨
            <HourlyWeather/>
            일출 일몰
            <SunMoonInfo/>
            위성 화면
            <SatelliteImageViewer/>
            오늘 상세

            주간 날씨


            미세먼지

            ...
            ...

        </Layout>
    );
};

export default WeatherDetail;
