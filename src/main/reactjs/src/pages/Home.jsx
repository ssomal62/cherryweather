import React from "react";
import Layout from "../common/Layout";
import TodayWeather from "../components/weather/TodayWeather";
import SampleFrame from "./weather/SampleFrame";


const Home = () => {
    return (
        <Layout containerMargin="20px 0 0 0" containerPadding="20px 0 0 0">
            <SampleFrame/>
            <TodayWeather/>
        </Layout>
    );
};

export default Home;
