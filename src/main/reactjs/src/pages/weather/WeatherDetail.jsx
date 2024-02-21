import React from 'react';
import Layout from "../../common/Layout";
import HourlyWeather from "../../components/weather/HourlyWeather";
import TodayWeather from "../../components/weather/TodayWeather";

const WeatherDetail = () => {
    return (
        <Layout>
            <TodayWeather/>
            <HourlyWeather/>
        </Layout>
    );
};

export default WeatherDetail;
