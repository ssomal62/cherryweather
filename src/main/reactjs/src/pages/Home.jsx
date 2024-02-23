import React from "react";
import Layout from "../common/Layout";
import TodayWeather from "../components/weather/TodayWeather";
import SampleFrame from "./weather/SampleFrame";


const Home = () => {
    return (
        <Layout>
            <SampleFrame/>
            <TodayWeather/>
        </Layout>
    );
};

export default Home;
