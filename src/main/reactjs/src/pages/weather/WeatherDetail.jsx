import React from 'react';
import Layout from "../../common/Layout";
import HourlyWeather from "../../components/weather/HourlyWeather";
import TodayWeather from "../../components/weather/TodayWeather";
import SatelliteImageViewer from "../../components/weather/SatelliteImageViewer";
import TodayDetail from "../../components/weather/TodayDetail";

const WeatherDetail = () => {
    return (
        <Layout>
            오늘 날씨
            <TodayWeather/>
            시간별 날씨
            <HourlyWeather/>
            일출 일몰
            <TodayDetail/>
            위성 화면
            <SatelliteImageViewer/>
            주간 날씨


            미세먼지

            ...
            ...
<div style={{marginBottom:'100px'}}>123</div>
        </Layout>
    );
};

export default WeatherDetail;
