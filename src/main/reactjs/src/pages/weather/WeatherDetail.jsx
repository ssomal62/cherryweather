import React from 'react';
import Layout from "../../common/Layout";
import HourlyWeather from "../../components/weather/HourlyWeather";

const WeatherDetail = () => {
    return (
        <Layout>
            <HourlyWeather/>
        </Layout>
    );
};

export default WeatherDetail;
